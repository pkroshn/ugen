#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const { generateProject, listTemplates, configure, showVersion, setupGuidelines, manageGuidelines } = require('../src/cli');

// Display banner
console.log(
  chalk.cyan(
    figlet.textSync('UGen', { horizontalLayout: 'full' })
  )
);
console.log(chalk.gray('AI-Powered Project Generator\n'));

program
  .name('ugen')
  .description('Generate projects using AI')
  .version('1.0.0');

// Main generate command
program
  .command('generate <prompt>')
  .alias('g')
  .description('Generate a project from description')
  .option('-o, --output <path>', 'Output directory', '.')
  .option('-t, --template <name>', 'Use specific template (e.g., adminlte, react-admin)')
  .option('-i, --interactive', 'Interactive mode with guided questions')
  .option('--no-install', 'Skip automatic dependency installation')
  .action(async (prompt, options) => {
    try {
      await generateProject(prompt, options);
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      if (process.env.NODE_ENV === 'development') {
        console.error(chalk.gray(error.stack));
      }
      process.exit(1);
    }
  });

// Templates command
program
  .command('templates')
  .alias('t')
  .description('List available templates')
  .action(async () => {
    try {
      await listTemplates();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Configuration command
program
  .command('config')
  .description('Configure API settings')
  .action(async () => {
    try {
      await configure();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Setup command
program
  .command('setup')
  .description('Initialize guidelines directory with sample templates')
  .action(async () => {
    try {
      await setupGuidelines();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Guidelines command
program
  .command('guidelines')
  .alias('guide')
  .description('List and manage project guidelines')
  .action(async () => {
    try {
      await manageGuidelines();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Version command
program
  .command('version')
  .alias('v')
  .description('Show version information')
  .action(showVersion);

// Help command enhancement
program.on('--help', () => {
  console.log('\nExamples:');
  console.log('  $ ugen setup                          # Initialize guidelines');
  console.log('  $ ugen g "Create a blog with auth"    # Generate project');
  console.log('  $ ugen g "Admin dashboard" -t adminlte # Use AdminLTE template');
  console.log('  $ ugen g "E-commerce site" --interactive');
  console.log('  $ ugen guidelines                     # List guidelines');
  console.log('  $ ugen templates                      # List templates');
  console.log('  $ ugen config                         # Configure API');
  console.log('\nWorkflow:');
  console.log('  1. Run "ugen setup" to create guidelines folder');
  console.log('  2. Edit .txt files in guidelines/ to customize templates');
  console.log('  3. Generate projects that automatically use your guidelines');
  console.log('\nTemplates:');
  console.log('  • AdminLTE, React Admin, Vue Admin dashboards');
  console.log('  • Next.js SaaS, Express API boilerplates');
  console.log('  • Auto-detected based on your prompt keywords');
});

program.parse();