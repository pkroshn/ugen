const axios = require('axios');
const { loadConfig } = require('./utils');
const FileGenerators = require('./generators/file-generators');
const ProjectTemplates = require('./generators/project-templates');

class ApiClient {
  constructor() {
    this.config = loadConfig();
    this.fileGenerators = new FileGenerators();
    this.projectTemplates = new ProjectTemplates();
    
    this.client = axios.create({
      baseURL: this.config.apiUrl || 'https://api.ugen.dev',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey || process.env.UGEN_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'UGen-CLI/1.0.0'
      },
      timeout: 60000 // 60 seconds for AI processing
    });

    // Add request interceptor for debugging
    this.client.interceptors.request.use(
      (config) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please run "ugen config" to update your credentials.');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a few minutes.');
        }
        if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Cannot connect to ProjectGen API. Please check your internet connection.');
        }
        throw error;
      }
    );
  }

  async analyzeRequirements(prompt) {
    try {
      if (process.env.NODE_ENV === 'development' || !this.config.apiKey) {
        return this.mockAnalyzeRequirements(prompt);
      }

      const response = await this.client.post('/api/analyze', {
        prompt,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
      
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using mock analysis (development mode)');
        return this.mockAnalyzeRequirements(prompt);
      }
      throw new Error(`Analysis failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async generateProject(data) {
    try {
      if (process.env.NODE_ENV === 'development' || !this.config.apiKey) {
        return this.mockGenerateProject(data);
      }

      const response = await this.client.post('/api/generate', data);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using mock generation (development mode)');
        return this.mockGenerateProject(data);
      }
      throw new Error(`Generation failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async getTemplates() {
    try {
      if (process.env.NODE_ENV === 'development' || !this.config.apiKey) {
        return this.mockGetTemplates();
      }

      const response = await this.client.get('/api/templates');
      return response.data.templates;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        return this.mockGetTemplates();
      }
      throw new Error(`Failed to fetch templates: ${error.message}`);
    }
  }

  // Mock methods for development/testing
  mockAnalyzeRequirements(prompt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          projectType: 'web-application',
          techStack: ['React', 'Node.js', 'Express'],
          features: ['authentication', 'database', 'api'],
          complexity: 'medium',
          estimatedFiles: 15
        });
      }, 1000);
    });
  }

  mockGenerateProject(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const projectData = this.projectTemplates.getFullStackTemplate(data.prompt);
        resolve(projectData);
      }, 2000);
    });
  }

  mockGetTemplates() {
    return this.projectTemplates.getAvailableTemplates();
  }
}

module.exports = ApiClient;