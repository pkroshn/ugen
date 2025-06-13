const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const chalk = require('chalk');

const execAsync = promisify(exec);

class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }

  async createProject(projectData) {
    // Ensure base directory exists
    await fs.ensureDir(this.basePath);

    // Create directory structure
    if (projectData.structure?.folders) {
      await this.createDirectories(projectData.structure.folders);
    }
    
    // Create files
    if (projectData.files) {
      await this.createFiles(projectData.files);
    }
    
    // Create configuration files
    if (projectData.config) {
      await this.createConfigFiles(projectData.config);
    }
  }

  async createDirectories(folders) {
    for (const folder of folders) {
      const fullPath = path.join(this.basePath, folder);
      await fs.ensureDir(fullPath);
    }
  }

  async createFiles(files) {
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(this.basePath, filePath);
      
      // Ensure parent directory exists
      await fs.ensureDir(path.dirname(fullPath));
      
      // Write file content
      await fs.writeFile(fullPath, content, 'utf8');
    }
  }

  async createConfigFiles(config) {
    // Create package.json for Node.js projects
    if (config.packageJson && config.type === 'nodejs') {
      const packageJsonPath = path.join(this.basePath, 'package.json');
      
      // If package.json content is not already provided in files
      if (!await fs.pathExists(packageJsonPath)) {
        const defaultPackageJson = {
          name: path.basename(this.basePath),
          version: '1.0.0',
          description: 'Generated project using ProjectGen AI',
          main: 'index.js',
          scripts: {
            start: 'node index.js',
            test: 'echo "Error: no test specified" && exit 1'
          },
          keywords: [],
          author: '',
          license: 'ISC'
        };

        await fs.writeJson(packageJsonPath, defaultPackageJson, { spaces: 2 });
      }
    }

    // Create other config files if specified
    if (config.files) {
      for (const [fileName, content] of Object.entries(config.files)) {
        const filePath = path.join(this.basePath, fileName);
        await fs.writeFile(filePath, content, 'utf8');
      }
    }
  }

  async setupDependencies(projectData) {
    // Check if package.json exists
    const packageJsonPath = path.join(this.basePath, 'package.json');
    
    if (await fs.pathExists(packageJsonPath)) {
      try {
        // Install npm dependencies
        await execAsync('npm install', { 
          cwd: this.basePath,
          stdio: 'inherit'
        });
        
        return true;
      } catch (error) {
        console.warn(chalk.yellow('Warning: Failed to install dependencies automatically'));
        console.warn(chalk.gray('You can install them manually by running: npm install'));
        return false;
      }
    }

    // Handle Python projects
    if (projectData.config?.type === 'python') {
      const requirementsPath = path.join(this.basePath, 'requirements.txt');
      
      if (await fs.pathExists(requirementsPath)) {
        try {
          await execAsync('pip install -r requirements.txt', { 
            cwd: this.basePath,
            stdio: 'inherit'
          });
          return true;
        } catch (error) {
          console.warn(chalk.yellow('Warning: Failed to install Python dependencies'));
          console.warn(chalk.gray('You can install them manually by running: pip install -r requirements.txt'));
          return false;
        }
      }
    }

    return false;
  }

  async validateProject() {
    // Basic validation to ensure project was created correctly
    const checks = [
      {
        name: 'Base directory exists',
        check: () => fs.pathExists(this.basePath)
      },
      {
        name: 'Has package.json',
        check: () => fs.pathExists(path.join(this.basePath, 'package.json'))
      },
      {
        name: 'Has README.md',
        check: () => fs.pathExists(path.join(this.basePath, 'README.md'))
      }
    ];

    const results = [];
    for (const check of checks) {
      try {
        const passed = await check.check();
        results.push({ name: check.name, passed });
      } catch (error) {
        results.push({ name: check.name, passed: false, error: error.message });
      }
    }

    return results;
  }

  async getProjectStats() {
    // Get basic statistics about the generated project
    const stats = {
      totalFiles: 0,
      totalFolders: 0,
      totalSize: 0,
      fileTypes: {}
    };

    try {
      const walk = async (dir) => {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = await fs.stat(filePath);
          
          if (stat.isDirectory()) {
            stats.totalFolders++;
            await walk(filePath);
          } else {
            stats.totalFiles++;
            stats.totalSize += stat.size;
            
            const ext = path.extname(file).toLowerCase();
            stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1;
          }
        }
      };

      await walk(this.basePath);
    } catch (error) {
      console.warn('Could not calculate project statistics:', error.message);
    }

    return stats;
  }

  async createGitRepository() {
    // Initialize git repository
    try {
      await execAsync('git init', { cwd: this.basePath });
      await execAsync('git add .', { cwd: this.basePath });
      await execAsync('git commit -m "Initial commit - Generated by ProjectGen AI"', { 
        cwd: this.basePath 
      });
      return true;
    } catch (error) {
      console.warn(chalk.yellow('Warning: Could not initialize git repository'));
      return false;
    }
  }

  // Helper method to safely write files with error handling
  async safeWriteFile(filePath, content, options = {}) {
    try {
      const fullPath = path.join(this.basePath, filePath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, content, { encoding: 'utf8', ...options });
      return true;
    } catch (error) {
      console.error(chalk.red(`Failed to write file ${filePath}:`), error.message);
      return false;
    }
  }

  // Helper method to copy template files
  async copyTemplate(templatePath, targetPath) {
    try {
      const sourcePath = path.resolve(__dirname, '..', 'templates', templatePath);
      const fullTargetPath = path.join(this.basePath, targetPath);
      
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, fullTargetPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error(chalk.red(`Failed to copy template ${templatePath}:`), error.message);
      return false;
    }
  }
}

module.exports = FileManager;