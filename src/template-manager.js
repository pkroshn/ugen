const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');

class TemplateManager {
  constructor() {
    this.templatesDir = path.join(process.cwd(), 'templates');
    this.templateRegistry = {
      'adminlte': {
        name: 'AdminLTE Dashboard',
        description: 'Complete admin dashboard with AdminLTE theme',
        keywords: ['admin', 'dashboard', 'panel', 'management', 'backend'],
        type: 'web-dashboard',
        downloadUrl: 'https://github.com/ColorlibHQ/AdminLTE/archive/refs/heads/master.zip',
        setupInstructions: [
          'Navigate to your project directory',
          'Run "npm install" to install dependencies',
          'Start with "npm run dev"',
          'Open http://localhost:3000 in your browser'
        ]
      },
      'react-admin': {
        name: 'React Admin Dashboard',
        description: 'Modern React admin dashboard with Material-UI',
        keywords: ['react', 'admin', 'dashboard', 'material', 'mui'],
        type: 'react-dashboard',
        downloadUrl: 'https://github.com/marmelab/react-admin/archive/refs/heads/master.zip',
        setupInstructions: [
          'Navigate to your project directory',
          'Run "npm install" to install dependencies',
          'Run "npm start" to start development server',
          'Open http://localhost:3000 in your browser'
        ]
      },
      'vue-admin': {
        name: 'Vue Admin Dashboard',
        description: 'Vue.js admin dashboard with Element Plus',
        keywords: ['vue', 'admin', 'dashboard', 'element', 'plus'],
        type: 'vue-dashboard',
        downloadUrl: 'https://github.com/PanJiaChen/vue-admin-template/archive/refs/heads/master.zip',
        setupInstructions: [
          'Navigate to your project directory',
          'Run "npm install" to install dependencies',
          'Run "npm run serve" to start development server',
          'Open http://localhost:8080 in your browser'
        ]
      },
      'bootstrap-admin': {
        name: 'Bootstrap Admin Template',
        description: 'Clean Bootstrap admin template',
        keywords: ['bootstrap', 'admin', 'template', 'responsive'],
        type: 'bootstrap-dashboard',
        downloadUrl: 'https://github.com/StartBootstrap/startbootstrap-sb-admin-2/archive/refs/heads/master.zip',
        setupInstructions: [
          'Open index.html in your browser',
          'Customize the template as needed',
          'Replace sample data with your content'
        ]
      },
      'nextjs-saas': {
        name: 'Next.js SaaS Starter',
        description: 'Complete SaaS starter with authentication and payments',
        keywords: ['nextjs', 'saas', 'stripe', 'auth', 'subscription'],
        type: 'saas-template',
        downloadUrl: 'https://github.com/vercel/nextjs-subscription-payments/archive/refs/heads/main.zip',
        setupInstructions: [
          'Navigate to your project directory',
          'Copy .env.local.example to .env.local',
          'Configure your Stripe and Supabase keys',
          'Run "npm install" and "npm run dev"'
        ]
      },
      'express-api': {
        name: 'Express API Boilerplate',
        description: 'Production-ready Express.js API with authentication',
        keywords: ['express', 'api', 'nodejs', 'jwt', 'mongodb'],
        type: 'api-template',
        downloadUrl: 'https://github.com/hagopj13/node-express-boilerplate/archive/refs/heads/master.zip',
        setupInstructions: [
          'Navigate to your project directory',
          'Copy .env.example to .env',
          'Configure your MongoDB and JWT settings',
          'Run "npm install" and "npm run dev"'
        ]
      }
    };
  }

  /**
   * Find templates based on user prompt
   */
  findMatchingTemplates(prompt) {
    const promptLower = prompt.toLowerCase();
    const matches = [];

    for (const [id, template] of Object.entries(this.templateRegistry)) {
      let score = 0;

      // Check keywords
      for (const keyword of template.keywords) {
        if (promptLower.includes(keyword)) {
          score += 2;
        }
      }

      // Check template name and description
      if (promptLower.includes(template.name.toLowerCase())) {
        score += 5;
      }
      if (promptLower.includes(template.description.toLowerCase())) {
        score += 3;
      }

      if (score > 0) {
        matches.push({ id, template, score });
      }
    }

    // Sort by score (highest first)
    return matches.sort((a, b) => b.score - a.score);
  }

  /**
   * Check if prompt suggests using a pre-built template
   */
  shouldUseTemplate(prompt) {
    const matches = this.findMatchingTemplates(prompt);
    
    // Use template if we have a good match (score >= 4)
    if (matches.length > 0 && matches[0].score >= 4) {
      return matches[0];
    }

    return null;
  }

  /**
   * Download and setup a template
   */
  async downloadTemplate(templateId, outputPath) {
    const template = this.templateRegistry[templateId];
    if (!template) {
      throw new Error(`Template '${templateId}' not found`);
    }

    const spinner = ora(`Downloading ${template.name}...`).start();

    try {
      // Create output directory
      await fs.ensureDir(outputPath);

      // For now, we'll create a sample structure instead of downloading
      // In production, you'd implement actual downloading from GitHub/etc.
      await this.createTemplateStructure(templateId, outputPath);

      spinner.succeed(`${template.name} template created successfully!`);

      return {
        name: template.name,
        description: template.description,
        type: template.type,
        setupInstructions: template.setupInstructions
      };

    } catch (error) {
      spinner.fail(`Failed to download template: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create template structure (mock implementation)
   * In production, this would download and extract real templates
   */
  async createTemplateStructure(templateId, outputPath) {
    const template = this.templateRegistry[templateId];

    switch (templateId) {
      case 'adminlte':
        await this.createAdminLTETemplate(outputPath);
        break;
      case 'react-admin':
        await this.createReactAdminTemplate(outputPath);
        break;
      case 'vue-admin':
        await this.createVueAdminTemplate(outputPath);
        break;
      case 'bootstrap-admin':
        await this.createBootstrapAdminTemplate(outputPath);
        break;
      case 'nextjs-saas':
        await this.createNextJSSaaSTemplate(outputPath);
        break;
      case 'express-api':
        await this.createExpressAPITemplate(outputPath);
        break;
      default:
        throw new Error(`Template structure not implemented for ${templateId}`);
    }
  }

  /**
   * Create AdminLTE template structure
   */
  async createAdminLTETemplate(outputPath) {
    const structure = {
      'package.json': JSON.stringify({
        name: 'adminlte-dashboard',
        version: '1.0.0',
        description: 'AdminLTE Dashboard',
        scripts: {
          dev: 'webpack serve --mode development',
          build: 'webpack --mode production',
          start: 'serve dist'
        },
        dependencies: {
          'admin-lte': '^3.2.0',
          'bootstrap': '^5.1.0',
          'jquery': '^3.6.0'
        },
        devDependencies: {
          'webpack': '^5.0.0',
          'webpack-cli': '^4.0.0',
          'webpack-dev-server': '^4.0.0',
          'serve': '^14.0.0'
        }
      }, null, 2),

      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AdminLTE Dashboard</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="fas fa-user"></i> Admin</a>
      </li>
    </ul>
  </nav>

  <!-- Sidebar -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="#" class="brand-link">
      <span class="brand-text font-weight-light">UGen Dashboard</span>
    </a>
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview">
          <li class="nav-item">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>Users</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-cog"></i>
              <p>Settings</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <!-- Content Wrapper -->
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <h1 class="m-0">Dashboard</h1>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>150</h3>
                <p>New Orders</p>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>53%</h3>
                <p>Bounce Rate</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
</body>
</html>`,

      'README.md': `# AdminLTE Dashboard

A complete admin dashboard built with AdminLTE theme.

## Features
- Responsive design
- Multiple layout options
- Charts and widgets
- User management
- Settings panel

## Getting Started
1. Open index.html in your browser
2. Customize the template as needed
3. Add your own data and functionality

## Customization
- Edit index.html to modify the layout
- Add custom CSS in styles.css
- Integrate with your backend API
`
    };

    // Create all files
    for (const [filename, content] of Object.entries(structure)) {
      const filePath = path.join(outputPath, filename);
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content, 'utf8');
    }
  }

  /**
   * Create React Admin template structure
   */
  async createReactAdminTemplate(outputPath) {
    // Implementation for React Admin template
    const structure = {
      'package.json': JSON.stringify({
        name: 'react-admin-dashboard',
        version: '1.0.0',
        description: 'React Admin Dashboard',
        scripts: {
          start: 'react-scripts start',
          build: 'react-scripts build',
          test: 'react-scripts test'
        },
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'react-admin': '^4.0.0',
          '@mui/material': '^5.0.0',
          '@emotion/react': '^11.0.0',
          '@emotion/styled': '^11.0.0'
        },
        devDependencies: {
          'react-scripts': '^5.0.1'
        }
      }, null, 2),
      // Add more React Admin files here
    };

    for (const [filename, content] of Object.entries(structure)) {
      const filePath = path.join(outputPath, filename);
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content, 'utf8');
    }
  }

  /**
   * Create Vue Admin template structure
   */
  async createVueAdminTemplate(outputPath) {
    // Implementation for Vue Admin template
  }

  /**
   * Create Bootstrap Admin template structure
   */
  async createBootstrapAdminTemplate(outputPath) {
    // Implementation for Bootstrap Admin template
  }

  /**
   * Create Next.js SaaS template structure
   */
  async createNextJSSaaSTemplate(outputPath) {
    // Implementation for Next.js SaaS template
  }

  /**
   * Create Express API template structure
   */
  async createExpressAPITemplate(outputPath) {
    // Implementation for Express API template
  }

  /**
   * List all available templates
   */
  listAvailableTemplates() {
    console.log(chalk.blue('\n📦 Available Templates:\n'));

    for (const [id, template] of Object.entries(this.templateRegistry)) {
      console.log(chalk.green(`🎨 ${template.name} (${id})`));
      console.log(chalk.gray(`   ${template.description}`));
      console.log(chalk.cyan(`   Keywords: ${template.keywords.join(', ')}`));
      console.log('');
    }

    console.log(chalk.yellow('💡 Templates are automatically selected based on your prompt keywords.'));
    console.log(chalk.gray('Or use: ugen g "prompt" --template template-id\n'));
  }

  /**
   * Get template by ID
   */
  getTemplate(templateId) {
    return this.templateRegistry[templateId] || null;
  }

  /**
   * Get all template IDs
   */
  getTemplateIds() {
    return Object.keys(this.templateRegistry);
  }
}

module.exports = TemplateManager;
