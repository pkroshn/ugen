const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// Configuration management
const CONFIG_DIR = path.join(os.homedir(), '.ugen');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const CACHE_DIR = path.join(CONFIG_DIR, 'cache');
const TEMPLATES_DIR = path.join(CONFIG_DIR, 'templates');

/**
 * Load configuration from user's home directory
 */
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = fs.readJsonSync(CONFIG_FILE);
      
      // Merge with environment variables
      return {
        ...config,
        apiKey: config.apiKey || process.env.PROJECTGEN_API_KEY || '',
        apiUrl: config.apiUrl || process.env.PROJECTGEN_API_URL || 'https://api.projectgen.dev'
      };
    }
  } catch (error) {
    console.warn('Warning: Could not load config file, using defaults');
  }
  
  // Return default configuration
  return {
    apiUrl: process.env.UGEN_API_URL || 'https://api.ugen.dev',
    apiKey: process.env.UGEN_API_KEY || '',
    autoInstall: true,
    gitInit: true,
    defaultOutput: '.',
    cacheTemplates: true
  };
}

/**
 * Save configuration to user's home directory
 */
function saveConfig(config) {
  try {
    fs.ensureDirSync(CONFIG_DIR);
    
    // Merge with existing config
    const existingConfig = loadConfig();
    const newConfig = { ...existingConfig, ...config };
    
    fs.writeJsonSync(CONFIG_FILE, newConfig, { spaces: 2 });
    return true;
  } catch (error) {
    console.error('Error saving configuration:', error.message);
    return false;
  }
}

/**
 * Get cache directory path
 */
function getCacheDir() {
  fs.ensureDirSync(CACHE_DIR);
  return CACHE_DIR;
}

/**
 * Get templates directory path
 */
function getTemplatesDir() {
  fs.ensureDirSync(TEMPLATES_DIR);
  return TEMPLATES_DIR;
}

/**
 * Cache API response
 */
function cacheData(key, data, ttl = 3600000) { // 1 hour default TTL
  try {
    const cacheFile = path.join(getCacheDir(), `${key}.json`);
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    fs.writeJsonSync(cacheFile, cacheData);
    return true;
  } catch (error) {
    console.warn('Warning: Could not cache data:', error.message);
    return false;
  }
}

/**
 * Get cached data if still valid
 */
function getCachedData(key) {
  try {
    const cacheFile = path.join(getCacheDir(), `${key}.json`);
    
    if (fs.existsSync(cacheFile)) {
      const cached = fs.readJsonSync(cacheFile);
      const now = Date.now();
      
      if (now - cached.timestamp < cached.ttl) {
        return cached.data;
      } else {
        // Clean up expired cache
        fs.removeSync(cacheFile);
      }
    }
  } catch (error) {
    console.warn('Warning: Could not read cached data:', error.message);
  }
  
  return null;
}

/**
 * Generate a unique hash for caching
 */
function generateCacheKey(data) {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}

/**
 * Validate project name
 */
function validateProjectName(name) {
  // Check for valid npm package name rules
  const validName = /^[a-z0-9-_.]+$/i.test(name);
  const validLength = name.length > 0 && name.length <= 214;
  const noSpecialStart = !name.startsWith('.') && !name.startsWith('_');
  
  return {
    valid: validName && validLength && noSpecialStart,
    errors: [
      ...(validName ? [] : ['Name can only contain letters, numbers, hyphens, dots and underscores']),
      ...(validLength ? [] : ['Name must be between 1 and 214 characters']),
      ...(noSpecialStart ? [] : ['Name cannot start with a dot or underscore'])
    ]
  };
}

/**
 * Sanitize file path to prevent directory traversal
 */
function sanitizePath(inputPath) {
  // Remove any path traversal attempts
  const sanitized = path.normalize(inputPath).replace(/^(\.\.[\/\\])+/, '');
  return sanitized;
}

/**
 * Format file size in human readable format
 */
function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get system information for debugging
 */
function getSystemInfo() {
  return {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    homeDir: os.homedir(),
    tmpDir: os.tmpdir(),
    configDir: CONFIG_DIR
  };
}

/**
 * Clean up old cache files
 */
function cleanupCache(maxAge = 7 * 24 * 60 * 60 * 1000) { // 7 days default
  try {
    const cacheDir = getCacheDir();
    const files = fs.readdirSync(cacheDir);
    const now = Date.now();
    let cleaned = 0;
    
    for (const file of files) {
      const filePath = path.join(cacheDir, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtime.getTime() > maxAge) {
        fs.removeSync(filePath);
        cleaned++;
      }
    }
    
    return cleaned;
  } catch (error) {
    console.warn('Warning: Could not clean cache:', error.message);
    return 0;
  }
}

/**
 * Check if CLI is running in development mode
 */
function isDevelopment() {
  return process.env.NODE_ENV === 'development' || 
         process.env.PROJECTGEN_DEV === 'true' ||
         !process.pkg; // If not packaged as executable
}

/**
 * Retry function with exponential backoff
 */
async function retry(fn, options = {}) {
  const {
    attempts = 3,
    delay = 1000,
    factor = 2,
    maxDelay = 10000
  } = options;
  
  let lastError;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i === attempts - 1) {
        throw lastError;
      }
      
      const waitTime = Math.min(delay * Math.pow(factor, i), maxDelay);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

/**
 * Parse semantic version string
 */
function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(.*)$/);
  
  if (!match) {
    return null;
  }
  
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4]
  };
}

/**
 * Compare two version strings
 */
function compareVersions(v1, v2) {
  const version1 = parseVersion(v1);
  const version2 = parseVersion(v2);
  
  if (!version1 || !version2) {
    return 0;
  }
  
  if (version1.major !== version2.major) {
    return version1.major - version2.major;
  }
  
  if (version1.minor !== version2.minor) {
    return version1.minor - version2.minor;
  }
  
  return version1.patch - version2.patch;
}

/**
 * Escape special characters for regex
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  // Configuration
  loadConfig,
  saveConfig,
  
  // Paths
  getCacheDir,
  getTemplatesDir,
  
  // Caching
  cacheData,
  getCachedData,
  generateCacheKey,
  cleanupCache,
  
  // Validation
  validateProjectName,
  sanitizePath,
  
  // Utilities
  formatFileSize,
  getSystemInfo,
  isDevelopment,
  retry,
  parseVersion,
  compareVersions,
  escapeRegex
};