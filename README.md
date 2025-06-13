# ProjectGen CLI

🚀 AI-powered project generator that creates complete, production-ready applications from simple descriptions.

## Features

- **AI-Powered**: Describes your project in natural language and get a complete codebase
- **Guidelines-Based**: Create custom .txt templates that guide project generation
- **Multiple Tech Stacks**: React, Vue, Angular, Node.js, Python, and more
- **Interactive Mode**: Guided project setup with smart questions
- **Template System**: Pre-built templates for common project types
- **Auto-Setup**: Automatic dependency installation and git initialization
- **Production Ready**: Generated code follows best practices

## Quick Start

### Installation

```bash
npm install -g projectgen-cli
```

### Initial Setup

```bash
# Initialize guidelines (required for first use)
projectgen setup
```

This creates a `guidelines` folder with sample .txt files that define your project templates and requirements.

### Generate Your First Project

```bash
# Simple generation (uses guidelines automatically)
projectgen generate "Create a React todo app with authentication"

# Interactive mode
projectgen g "Employee management system" --interactive

# Specify output directory
projectgen g "Blog platform" -o ./my-blog
```

## Usage Examples

### Basic Web Applications

```bash
projectgen g "Create a recipe sharing website with user accounts"
projectgen g "Build an e-commerce store with payment integration"
projectgen g "Social media dashboard with real-time updates"
```

### Full-Stack Applications

```bash
projectgen g "Employee management system with React frontend and Node.js backend"
projectgen g "Task management app with team collaboration features"
projectgen g "Inventory tracking system with reporting dashboard"
```

### Specialized Projects

```bash
projectgen g "REST API for a booking system with authentication"
projectgen g "React Native mobile app for expense tracking"
projectgen g "CLI tool for file management in Node.js"
```

## Command Reference

### `generate` (alias: `g`)

Generate a new project from a description.

```bash
projectgen generate <description> [options]
```

**Options:**

- `-o, --output <path>` - Output directory (default: current directory)
- `-t, --template <name>` - Use specific template
- `-i, --interactive` - Interactive mode with guided questions
- `--no-install` - Skip automatic dependency installation

**Examples:**

```bash
projectgen g "React admin panel"
projectgen g "Vue.js blog" -o ./my-blog
projectgen g "Express API" --interactive
```

### `templates` (alias: `t`)

List available templates.

```bash
projectgen templates
```

### `config`

Configure API settings.

```bash
projectgen config
```

### `version` (alias: `v`)

Show version information.

```bash
projectgen version
```

## Interactive Mode

Interactive mode guides you through project creation with smart questions:

```bash
projectgen g "My project idea" --interactive
```

You'll be asked about:

- Project name and type
- Required features (authentication, database, etc.)
- Technology stack preferences
- Deployment preferences

## Templates

ProjectGen includes several built-in templates:

- **react-express** - React frontend with Express.js backend
- **nextjs-fullstack** - Next.js full-stack application
- **vue-express** - Vue.js frontend with Express.js backend
- **angular-nest** - Angular frontend with NestJS backend
- **python-fastapi** - Python FastAPI backend
- **react-native** - React Native mobile app

Use templates with the `-t` flag:

```bash
projectgen g "My app" -t react-express
```

## Configuration

ProjectGen stores configuration in `~/.projectgen/config.json`.

### Manual Configuration

Edit the config file directly:

```json
{
  "apiKey": "your-api-key",
  "apiUrl": "https://api.projectgen.dev",
  "autoInstall": true,
  "gitInit": true,
  "defaultOutput": "."
}
```

### Environment Variables

You can also use environment variables:

```bash
export PROJECTGEN_API_KEY="your-api-key"
export PROJECTGEN_API_URL="https://api.projectgen.dev"
```

## Generated Project Structure

ProjectGen creates well-structured projects with:

- **Clean Architecture**: Organized folder structure
- **Best Practices**: Industry-standard coding patterns
- **Documentation**: README with setup instructions
- **Configuration**: Environment variables and config files
- **Development Tools**: Scripts for development and deployment

Example structure:

```
my-project/
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── server/
│   ├── routes/
│   └── models/
├── public/
├── tests/
├── package.json
├── README.md
├── .env.example
└── .gitignore
```

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/projectgen-cli
cd projectgen-cli

# Install dependencies
npm install

# Link for local testing
npm link

# Set development mode
export NODE_ENV=development

# Test the CLI
projectgen g "test project" -o ./test
```

### Building

```bash
# Create standalone executables
npm install -g pkg
pkg . --targets node16-win-x64,node16-macos-x64,node16-linux-x64
```

## API Integration

ProjectGen CLI communicates with an AI backend service. The backend:

1. Analyzes your project description using AI
2. Generates appropriate project architecture
3. Creates code files and configurations
4. Returns structured project data

### Mock Mode

For development and testing, the CLI includes mock responses when no API key is configured.

## Troubleshooting

### Common Issues

**CLI not found after installation:**

```bash
npm install -g projectgen-cli
```

**Permission denied:**

```bash
sudo npm install -g projectgen-cli
```

**API key issues:**

```bash
projectgen config
# Enter your API key when prompted
```

**Generation fails:**

- Check your internet connection
- Verify your API key is correct
- Try again with a simpler project description

### Debug Mode

```bash
export NODE_ENV=development
projectgen g "your project" --verbose
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Test locally: `npm link && projectgen g "test"`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/projectgen-cli/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/projectgen-cli/discussions)
- 📧 **Email**: support@projectgen.dev
- 📖 **Documentation**: [docs.projectgen.dev](https://docs.projectgen.dev)

---

**Made with ❤️ by the ProjectGen team**
