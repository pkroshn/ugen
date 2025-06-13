const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const path = require('path');
const fs = require('fs-extra');
const ApiClient = require('./api-client');
const FileManager = require('./file-manager');
const GuidelinesManager = require('./guidelines-manager');
const TemplateManager = require('./template-manager');
const { loadConfig, saveConfig } = require('./utils');

class ProjectGenerator {
  constructor() {
    this.apiClient = new ApiClient();
    this.guidelinesManager = new GuidelinesManager();
    this.templateManager = new TemplateManager();
    this.spinner = null;
  }

  async generateProject(prompt, options) {
    console.log(chalk.blue('\n🚀 Starting project generation...\n'));

    // Check if API is configured (skip check if using Claude directly)
    const config = loadConfig();
    const useClaudeDirect = process.env.USE_CLAUDE_DIRECT === 'true' && process.env.CLAUDE_API_KEY;
    
    if (!useClaudeDirect && !config.apiKey && !process.env.UGEN_API_KEY) {
      console.log(chalk.yellow('⚠️  API key not configured. Please run: ugen config'));
      console.log(chalk.cyan('💡 Or set USE_CLAUDE_DIRECT=true in .env to use Claude API directly'));
      return;
    }

    // Check if we should use a pre-built template instead of AI generation
    const templateMatch = this.templateManager.shouldUseTemplate(prompt);
    
    if (templateMatch && !options.template) {
      const { useTemplate } = await inquirer.prompt([{
        type: 'confirm',
        name: 'useTemplate',
        message: `Found template "${templateMatch.template.name}". Use this instead of AI generation?`,
        default: true
      }]);

      if (useTemplate) {
        return await this.generateFromTemplate(templateMatch.id, options, prompt);
      }
    }

    // If specific template requested, use it
    if (options.template) {
      const template = this.templateManager.getTemplate(options.template);
      if (template) {
        return await this.generateFromTemplate(options.template, options, prompt);
      } else {
        console.error(chalk.red(`❌ Template "${options.template}" not found.`));
        console.log(chalk.yellow('💡 Run "ugen templates" to see available templates.'));
        return;
      }
    }

    // Continue with AI generation
    await this.generateWithAI(prompt, options);
  }

  async generateFromTemplate(templateId, options, originalPrompt) {
    console.log(chalk.blue(`🎨 Using template: ${templateId}\n`));

    const outputPath = path.resolve(options.output);

    try {
      // Check if directory exists and is not empty
      if (await fs.pathExists(outputPath)) {
        const files = await fs.readdir(outputPath);
        if (files.length > 0) {
          const { overwrite } = await inquirer.prompt([{
            type: 'confirm',
            name: 'overwrite',
            message: 'Directory is not empty. Continue?',
            default: false
          }]);
          
          if (!overwrite) {
            console.log(chalk.yellow('Operation cancelled.'));
            return;
          }
        }
      }

      // Download and setup template
      const templateData = await this.templateManager.downloadTemplate(templateId, outputPath);

      // Show success message
      this.showTemplateSuccessMessage(outputPath, templateData);

    } catch (error) {
      console.error(chalk.red('❌ Template generation failed:'), error.message);
    }
  }

  async generateWithAI(prompt, options) {
    // Validate and enhance prompt with guidelines
    let enhancedPrompt;
    try {
      enhancedPrompt = await this.guidelinesManager.enhancePrompt(prompt);
    } catch (error) {
      console.error(chalk.red('❌ Guidelines Error:'), error.message);
      console.log(chalk.yellow('💡 Run "ugen setup" to initialize guidelines.'));
      console.log(chalk.yellow('💡 Or run "ugen guidelines" to see available guidelines.'));
      return;
    }

    // Interactive mode for more details
    if (options.interactive) {
      enhancedPrompt = await this.getInteractivePrompt(enhancedPrompt);
    }

    const outputPath = path.resolve(options.output);
    const fileManager = new FileManager(outputPath);

    try {
      // Check if directory exists and is not empty
      if (await fs.pathExists(outputPath)) {
        const files = await fs.readdir(outputPath);
        if (files.length > 0) {
          const { overwrite } = await inquirer.prompt([{
            type: 'confirm',
            name: 'overwrite',
            message: 'Directory is not empty. Continue?',
            default: false
          }]);
          
          if (!overwrite) {
            console.log(chalk.yellow('Operation cancelled.'));
            return;
          }
        }
      }

      // Step 1: Analyze requirements
      this.spinner = ora('🤖 Analyzing your requirements with guidelines...').start();
      const analysis = await this.apiClient.analyzeRequirements(enhancedPrompt);
      this.spinner.succeed('Requirements analyzed');

      // Step 2: Generate project structure
      this.spinner = ora('🏗️  Designing project architecture...').start();
      const projectData = await this.apiClient.generateProject({
        prompt: enhancedPrompt,
        analysis,
        template: options.template,
        outputPath
      });
      this.spinner.succeed('Architecture designed');

      // Step 3: Create files
      this.spinner = ora('📁 Creating project files...').start();
      await fileManager.createProject(projectData);
      this.spinner.succeed('Project files created');

      // Step 4: Setup dependencies (if not disabled)
      if (options.install !== false && projectData.config?.packageJson) {
        this.spinner = ora('📦 Installing dependencies...').start();
        try {
          await fileManager.setupDependencies(projectData);
          this.spinner.succeed('Dependencies installed');
        } catch (error) {
          this.spinner.warn('Dependencies installation failed - you can install manually');
        }
      }

      // Success message
      this.showSuccessMessage(outputPath, projectData);

    } catch (error) {
      if (this.spinner) this.spinner.fail('Generation failed');
      throw error;
    }
  }

  async getInteractivePrompt(initialPrompt) {
    console.log(chalk.blue('🎯 Let\'s gather more details about your project:\n'));

    const questions = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s your project name?',
        default: 'my-awesome-project',
        validate: input => input.trim().length > 0 || 'Project name is required'
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of project are you building?',
        choices: [
          { name: '🌐 Web Application (Frontend + Backend)', value: 'web-app' },
          { name: '📱 Mobile App (React Native)', value: 'mobile-app' },
          { name: '🖥️  Desktop App (Electron)', value: 'desktop-app' },
          { name: '🔧 API/Backend Service', value: 'api-backend' },
          { name: '⚡ CLI Tool', value: 'cli-tool' },
          { name: '📚 Documentation Site', value: 'docs-site' },
          { name: '🎨 Other', value: 'other' }
        ]
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'What features do you need? (Select multiple)',
        choices: [
          { name: '🔐 User Authentication & Authorization', value: 'auth' },
          { name: '💾 Database Integration', value: 'database' },
          { name: '🌐 API Integration', value: 'api-integration' },
          { name: '⚡ Real-time Features (WebSocket)', value: 'realtime' },
          { name: '📤 File Upload & Management', value: 'file-upload' },
          { name: '💳 Payment Processing', value: 'payments' },
          { name: '📧 Email Services', value: 'email' },
          { name: '🔍 Search Functionality', value: 'search' },
          { name: '📊 Analytics & Reporting', value: 'analytics' },
          { name: '🔔 Notifications', value: 'notifications' }
        ]
      },
      {
        type: 'list',
        name: 'techStack',
        message: 'Preferred technology stack?',
        choices: [
          { name: '⚛️  React + Node.js + Express', value: 'react-node' },
          { name: '🖖 Vue.js + Node.js + Express', value: 'vue-node' },
          { name: '🅰️  Angular + Node.js + NestJS', value: 'angular-nest' },
          { name: '▲ Next.js (Full-stack)', value: 'nextjs' },
          { name: '⚡ Vite + React + FastAPI (Python)', value: 'react-python' },
          { name: '🔥 MERN Stack (Mongo + Express + React + Node)', value: 'mern' },
          { name: '💎 Ruby on Rails + React', value: 'rails-react' },
          { name: '🎯 Let AI decide the best stack', value: 'ai-choice' }
        ]
      },
      {
        type: 'list',
        name: 'deployment',
        message: 'How do you plan to deploy?',
        choices: [
          { name: '🐳 Docker containers', value: 'docker' },
          { name: '☁️  Cloud platforms (AWS, GCP, Azure)', value: 'cloud' },
          { name: '▲ Vercel/Netlify', value: 'serverless' },
          { name: '🖥️  Traditional hosting', value: 'traditional' },
          { name: '🤷 Not sure yet', value: 'undecided' }
        ]
      }
    ];

    const answers = await inquirer.prompt(questions);
    
    // Combine initial prompt with interactive answers
    const enhancedPrompt = `
Project: ${initialPrompt}

Details:
- Project Name: ${answers.projectName}
- Type: ${answers.projectType}
- Features: ${answers.features.join(', ') || 'Basic functionality'}
- Tech Stack: ${answers.techStack}
- Deployment: ${answers.deployment}

Please create a professional, production-ready project with best practices, proper folder structure, and comprehensive documentation.
    `.trim();

    return enhancedPrompt;
  }

  showTemplateSuccessMessage(outputPath, templateData) {
    const relativePath = path.relative(process.cwd(), outputPath);
    const displayPath = relativePath || './';

    const message = `
${chalk.green('✅ Template created successfully!')}

${chalk.cyan('📁 Location:')} ${displayPath}
${chalk.cyan('🎨 Template:')} ${templateData.name}
${chalk.cyan('📝 Description:')} ${templateData.description}

${chalk.yellow('🚀 Next steps:')}
${templateData.setupInstructions.map(step => `  ${chalk.gray('•')} ${step}`).join('\n')}
    `.trim();

    console.log('\n' + boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green'
    }));

    console.log(chalk.gray('\n💡 This template is ready to use and customize!'));
    console.log(chalk.gray('🎯 Check the README.md for additional instructions.\n'));
  }

  showSuccessMessage(outputPath, projectData) {
    const relativePath = path.relative(process.cwd(), outputPath);
    const displayPath = relativePath || './';

    const message = `
${chalk.green('✅ Project generated successfully!')}

${chalk.cyan('📁 Location:')} ${displayPath}
${chalk.cyan('🏗️  Type:')} ${projectData.type || 'Custom Project'}
${chalk.cyan('⚡ Tech Stack:')} ${projectData.techStack || 'Mixed Technologies'}

${chalk.yellow('🚀 Next steps:')}
${projectData.setupInstructions ? 
  projectData.setupInstructions.map(step => `  ${chalk.gray('•')} ${step}`).join('\n') :
  `  ${chalk.gray('•')} Navigate to your project: cd ${displayPath}
  ${chalk.gray('•')} Follow the README.md for setup instructions
  ${chalk.gray('•')} Start coding! 🎉`
}
    `.trim();

    console.log('\n' + boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green'
    }));

    // Additional tips
    console.log(chalk.gray('\n💡 Tips:'));
    console.log(chalk.gray('  • Check the generated README.md for detailed instructions'));
    console.log(chalk.gray('  • Customize the code to fit your specific needs'));
    console.log(chalk.gray('  • Report issues or suggest improvements on our GitHub\n'));
  }
}

// Export functions
async function generateProject(prompt, options) {
  const generator = new ProjectGenerator();
  await generator.generateProject(prompt, options);
}

async function listTemplates() {
  try {
    const templateManager = new TemplateManager();
    templateManager.listAvailableTemplates();
  } catch (error) {
    console.error(chalk.red('Error listing templates:'), error.message);
  }
}

async function configure() {
  console.log(chalk.blue('⚙️  UGen Configuration\n'));

  const currentConfig = loadConfig();

  const questions = [
    {
      type: 'input',
      name: 'apiKey',
      message: 'Enter your UGen API key:',
      default: currentConfig.apiKey,
      validate: input => input.trim().length > 0 || 'API key is required'
    },
    {
      type: 'input',
      name: 'apiUrl',
      message: 'API URL:',
      default: currentConfig.apiUrl || 'https://api.ugen.dev'
    },
    {
      type: 'confirm',
      name: 'autoInstall',
      message: 'Automatically install dependencies?',
      default: currentConfig.autoInstall !== false
    }
  ];

  const config = await inquirer.prompt(questions);
  saveConfig(config);
  
  console.log(chalk.green('\n✅ Configuration saved successfully!'));
  console.log(chalk.gray('You can now generate projects with: ugen g "your project description"'));
}

function showVersion() {
  const packageJson = require('../package.json');
  console.log(`${chalk.bold('UGen CLI')} v${packageJson.version}`);
  console.log(chalk.gray('AI-powered project generator'));
}

// Setup command
async function setupGuidelines() {
  console.log(chalk.blue('🔧 Setting up UGen guidelines...\n'));
  
  const guidelinesManager = new GuidelinesManager();
  const success = await guidelinesManager.initializeGuidelines();
  
  if (success) {
    console.log(chalk.green('\n✅ Setup complete!'));
    console.log(chalk.cyan('\n📖 Next steps:'));
    console.log(chalk.gray('  1. Edit .txt files in the guidelines folder to customize your templates'));
    console.log(chalk.gray('  2. Run "ugen guidelines" to see available guidelines'));
    console.log(chalk.gray('  3. Generate projects with "ugen g \'your project description\'"'));
  }
}

// Guidelines command  
async function manageGuidelines() {
  const guidelinesManager = new GuidelinesManager();
  await guidelinesManager.listGuidelines();
}

module.exports = {
  generateProject,
  listTemplates,
  configure,
  showVersion,
  setupGuidelines,
  manageGuidelines
};