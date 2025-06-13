const FileGenerators = require('./file-generators');

class ProjectTemplates {
  constructor() {
    this.fileGenerators = new FileGenerators();
  }

  getFullStackTemplate(prompt) {
    return {
      type: 'Full-Stack Web Application',
      techStack: 'React + Node.js + Express + MongoDB',
      structure: {
        folders: [
          'src',
          'src/components',
          'src/pages',
          'src/utils',
          'src/hooks',
          'src/context',
          'src/services',
          'server',
          'server/routes',
          'server/models',
          'server/middleware',
          'server/config',
          'public',
          'public/images',
          'tests',
          'tests/components',
          'tests/server'
        ]
      },
      files: {
        'package.json': this.fileGenerators.generatePackageJson(),
        'README.md': this.fileGenerators.generateReadme(prompt),
        'src/App.js': this.fileGenerators.generateReactApp(),
        'src/index.js': this.fileGenerators.generateReactIndex(),
        'src/index.css': this.fileGenerators.generateIndexCSS(),
        'src/App.css': this.fileGenerators.generateAppCSS(),
        'src/components/Header.js': this.fileGenerators.generateHeader(),
        'src/components/Footer.js': this.fileGenerators.generateFooter(),
        'src/pages/Home.js': this.fileGenerators.generateHomePage(),
        'src/pages/About.js': this.fileGenerators.generateAboutPage(),
        'src/utils/api.js': this.fileGenerators.generateApiUtils(),
        'src/context/AppContext.js': this.fileGenerators.generateAppContext(),
        'server/index.js': this.fileGenerators.generateServerIndex(),
        'server/routes/api.js': this.fileGenerators.generateApiRoutes(),
        'server/routes/auth.js': this.fileGenerators.generateAuthRoutes(),
        'server/models/User.js': this.fileGenerators.generateUserModel(),
        'server/middleware/auth.js': this.fileGenerators.generateAuthMiddleware(),
        'server/config/database.js': this.fileGenerators.generateDatabaseConfig(),
        '.env.example': this.fileGenerators.generateEnvExample(),
        '.gitignore': this.fileGenerators.generateGitignore(),
        'public/index.html': this.fileGenerators.generateIndexHTML(),
        'public/manifest.json': this.fileGenerators.generateManifest(),
        'tests/App.test.js': this.fileGenerators.generateAppTest()
      },
      config: {
        packageJson: true,
        type: 'nodejs'
      },
      setupInstructions: [
        'Navigate to your project directory',
        'Run "npm install" to install dependencies',
        'Copy .env.example to .env and configure your environment variables',
        'Set up your MongoDB database (local or cloud)',
        'Run "npm run dev" to start both frontend and backend servers',
        'Frontend will be available at http://localhost:3000',
        'Backend API will be available at http://localhost:5000'
      ]
    };
  }

  getNextJSTemplate(prompt) {
    return {
      type: 'Next.js Full-Stack Application',
      techStack: 'Next.js + API Routes + MongoDB',
      structure: {
        folders: [
          'pages',
          'pages/api',
          'components',
          'lib',
          'styles',
          'public'
        ]
      },
      files: {
        'package.json': this.fileGenerators.generateNextJSPackageJson(),
        'README.md': this.fileGenerators.generateReadme(prompt),
        // Add Next.js specific files here
      },
      config: {
        packageJson: true,
        type: 'nextjs'
      },
      setupInstructions: [
        'Navigate to your project directory',
        'Run "npm install" to install dependencies',
        'Run "npm run dev" to start the development server',
        'Open http://localhost:3000 in your browser'
      ]
    };
  }

  getAvailableTemplates() {
    return [
      {
        name: 'react-express',
        description: 'React frontend with Express.js backend and MongoDB',
        techStack: 'React + Node.js + Express + MongoDB'
      },
      {
        name: 'nextjs-fullstack',
        description: 'Next.js full-stack application with API routes',
        techStack: 'Next.js + API Routes + MongoDB'
      },
      {
        name: 'vue-express',
        description: 'Vue.js frontend with Express.js backend',
        techStack: 'Vue.js + Node.js + Express'
      },
      {
        name: 'react-fastapi',
        description: 'React frontend with Python FastAPI backend',
        techStack: 'React + Python + FastAPI + PostgreSQL'
      },
      {
        name: 'angular-nest',
        description: 'Angular frontend with NestJS backend',
        techStack: 'Angular + NestJS + TypeScript'
      }
    ];
  }
}

module.exports = ProjectTemplates;