const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class GuidelinesManager {
  constructor() {
    this.guidelinesDir = path.join(process.cwd(), 'guidelines');
  }

  /**
   * Initialize guidelines directory
   */
  async initializeGuidelines() {
    try {
      // Create guidelines directory if it doesn't exist
      await fs.ensureDir(this.guidelinesDir);
      
      // Create sample guidelines if directory is empty
      const files = await fs.readdir(this.guidelinesDir);
      const txtFiles = files.filter(file => file.endsWith('.txt'));
      
      if (txtFiles.length === 0) {
        await this.createSampleGuidelines();
        console.log(chalk.green('✅ Guidelines directory created with sample files!'));
        console.log(chalk.cyan(`📁 Location: ${this.guidelinesDir}`));
        console.log(chalk.yellow('💡 Edit the .txt files in the guidelines folder to customize your project templates.'));
      }
      
      return true;
    } catch (error) {
      console.error(chalk.red('Error initializing guidelines:'), error.message);
      return false;
    }
  }

  /**
   * Check if guidelines directory exists and has files
   */
  async validateGuidelines() {
    try {
      // Check if directory exists
      if (!await fs.pathExists(this.guidelinesDir)) {
        throw new Error('Guidelines directory not found. Run "ugen setup" first.');
      }

      // Check for .txt files
      const files = await fs.readdir(this.guidelinesDir);
      const txtFiles = files.filter(file => file.endsWith('.txt'));

      if (txtFiles.length === 0) {
        throw new Error('No guidelines found. Please add .txt files to the guidelines directory.');
      }

      return txtFiles;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Read all guideline files and return combined content
   */
  async readGuidelines() {
    try {
      const txtFiles = await this.validateGuidelines();
      const guidelines = {};
      let combinedContent = '';

      for (const file of txtFiles) {
        const filePath = path.join(this.guidelinesDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const fileName = path.basename(file, '.txt');
        
        guidelines[fileName] = content.trim();
        combinedContent += `\n--- ${fileName.toUpperCase()} GUIDELINES ---\n${content.trim()}\n`;
      }

      return {
        individual: guidelines,
        combined: combinedContent.trim(),
        files: txtFiles
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find best matching guideline based on user prompt
   */
  async findBestGuideline(userPrompt) {
    try {
      const { individual } = await this.readGuidelines();
      const prompt = userPrompt.toLowerCase();
      
      // Score each guideline based on keyword matches
      const scores = {};
      
      for (const [name, content] of Object.entries(individual)) {
        const contentLower = content.toLowerCase();
        let score = 0;
        
        // Split prompt into words and check matches
        const promptWords = prompt.split(' ').filter(word => word.length > 2);
        
        for (const word of promptWords) {
          if (contentLower.includes(word)) {
            score += 1;
          }
        }
        
        // Bonus for exact phrase matches
        if (contentLower.includes(prompt)) {
          score += 5;
        }
        
        scores[name] = score;
      }
      
      // Find highest scoring guideline
      const bestMatch = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
      );
      
      if (scores[bestMatch] > 0) {
        return {
          name: bestMatch,
          content: individual[bestMatch],
          score: scores[bestMatch]
        };
      }
      
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Enhance user prompt with guidelines
   */
  async enhancePrompt(userPrompt) {
    try {
      const bestGuideline = await this.findBestGuideline(userPrompt);
      
      if (bestGuideline) {
        console.log(chalk.blue(`🎯 Using "${bestGuideline.name}" guidelines (score: ${bestGuideline.score})`));
        
        return `${userPrompt}

ADDITIONAL GUIDELINES AND REQUIREMENTS:
${bestGuideline.content}

Please incorporate these guidelines into the project generation.`;
      }
      
      // If no specific match, use all guidelines
      const { combined } = await this.readGuidelines();
      console.log(chalk.blue('📋 Using all available guidelines'));
      
      return `${userPrompt}

PROJECT GUIDELINES AND REQUIREMENTS:
${combined}

Please incorporate these guidelines into the project generation.`;
      
    } catch (error) {
      throw error;
    }
  }

  /**
   * List available guidelines
   */
  async listGuidelines() {
    try {
      const txtFiles = await this.validateGuidelines();
      
      console.log(chalk.blue('\n📋 Available Guidelines:\n'));
      
      for (const file of txtFiles) {
        const filePath = path.join(this.guidelinesDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const preview = content.substring(0, 100).replace(/\n/g, ' ');
        
        console.log(chalk.green(`📄 ${file}`));
        console.log(chalk.gray(`   ${preview}${content.length > 100 ? '...' : ''}`));
        console.log('');
      }
      
      console.log(chalk.yellow(`💡 Guidelines location: ${this.guidelinesDir}`));
      console.log(chalk.gray('Edit these files to customize your project generation.\n'));
      
    } catch (error) {
      console.error(chalk.red('Error listing guidelines:'), error.message);
      console.log(chalk.yellow('Run "ugen setup" to initialize guidelines.'));
    }
  }

  /**
   * Create sample guideline files
   */
  async createSampleGuidelines() {
    const samples = {
      'web-app.txt': `WEB APPLICATION GUIDELINES

Project Type: Full-stack web application
Tech Stack: React + Node.js + Express + MongoDB

REQUIRED FEATURES:
- User authentication (JWT-based)
- Responsive design (mobile-first)
- RESTful API design
- Input validation and sanitization
- Error handling and logging
- Environment-based configuration
- Security best practices

UI/UX REQUIREMENTS:
- Clean, modern interface
- Loading states and error messages
- Accessible design (WCAG compliance)
- Cross-browser compatibility

CODE STANDARDS:
- ESLint configuration
- Prettier formatting
- Comprehensive comments
- Modular component structure
- Reusable utility functions`,

      'api-service.txt': `API SERVICE GUIDELINES

Project Type: RESTful API service
Tech Stack: Node.js + Express + MongoDB

REQUIRED FEATURES:
- JWT authentication middleware
- Rate limiting
- Request/response logging
- Input validation with Joi
- Comprehensive error handling
- API documentation (Swagger)
- Unit and integration tests

SECURITY REQUIREMENTS:
- Helmet.js security headers
- CORS configuration
- Input sanitization
- SQL injection prevention
- Authentication rate limiting

API DESIGN:
- RESTful endpoints
- Consistent response format
- Proper HTTP status codes
- Pagination for list endpoints
- API versioning strategy`,

      'dashboard.txt': `DASHBOARD APPLICATION GUIDELINES

Project Type: Admin/Analytics Dashboard
Tech Stack: React + Charts.js + Material-UI
TEMPLATE SUGGESTION: Consider using AdminLTE template for quick setup

REQUIRED FEATURES:
- Data visualization (charts, graphs)
- Real-time updates
- Filtering and search
- Export functionality (PDF, CSV)
- User role management
- Responsive layout

UI COMPONENTS:
- Sidebar navigation
- Header with user profile
- Widget-based layout
- Data tables with sorting
- Modal dialogs
- Toast notifications

PERFORMANCE:
- Lazy loading for large datasets
- Virtualization for long lists
- Caching strategies
- Optimized API calls

TEMPLATE OPTIONS:
- AdminLTE: Classic admin template with Bootstrap
- React Admin: Modern React-based admin framework
- Vue Admin: Vue.js admin dashboard
- Bootstrap Admin: Clean Bootstrap template`,

      'mobile-app.txt': `MOBILE APPLICATION GUIDELINES

Project Type: React Native mobile app
Tech Stack: React Native + Expo

REQUIRED FEATURES:
- Cross-platform compatibility (iOS/Android)
- Offline functionality
- Push notifications
- Biometric authentication
- Deep linking
- App state management (Redux/Context)

MOBILE-SPECIFIC:
- Touch-friendly interface
- Gesture navigation
- Camera/photo integration
- Device storage
- Location services
- Background sync

PERFORMANCE:
- Image optimization
- Memory management
- Battery optimization
- Network efficiency`
    };

    for (const [filename, content] of Object.entries(samples)) {
      const filePath = path.join(this.guidelinesDir, filename);
      await fs.writeFile(filePath, content, 'utf8');
    }
  }

  /**
   * Get guidelines directory path
   */
  getGuidelinesPath() {
    return this.guidelinesDir;
  }
}

module.exports = GuidelinesManager;