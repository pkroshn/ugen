# UGen CLI

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
npm install -g ugen-cli
```

### Initial Setup

```bash
# Initialize guidelines (required for first use)
ugen setup
```

This creates a `guidelines` folder with sample .txt files that define your project templates and requirements.

### Generate Your First Project

```bash
# Simple generation (uses guidelines automatically)
ugen generate "Create a React todo app with authentication"

# Interactive mode
ugen g "Employee management system" --interactive

# Specify output directory
ugen g "Blog platform" -o ./my-blog
```

## Usage Examples

### Basic Web Applications

```bash
ugen g "Create a recipe sharing website with user accounts"
ugen g "Build an e-commerce store with payment integration"
ugen g "Social media dashboard with real-time updates"
```

### Full-Stack Applications

```bash
ugen g "Employee management system with React frontend and Node.js backend"
ugen g "Task management app with team collaboration features"
ugen g "Inventory tracking system with reporting dashboard"
```

### Specialized Projects

```bash
ugen g "REST API for a booking system with authentication"
ugen g "React Native mobile app for expense tracking"
ugen g "CLI tool for file management in Node.js"
```

## Command Reference

### `generate` (alias: `g`)

Generate a new project from a description.

```bash
ugen generate <description> [options]
```

**Options:**

- `-o, --output <path>` - Output directory (default: current directory)
- `-t, --template <name>` - Use specific template
- `-i, --interactive` - Interactive mode with guided questions
- `--no-install` - Skip automatic dependency installation

**Examples:**

```bash
ugen g "React admin panel"
ugen g "Vue.js blog" -o ./my-blog
ugen g "Express API" --interactive
```

### `templates` (alias: `t`)

List available templates.

```bash
ugen templates
```

### `config`

Configure API settings.

```bash
ugen config
```

### `version` (alias: `v`)

Show version information.

```bash
ugen version
```

## Interactive Mode

Interactive mode guides you through project creation with smart questions:

```bash
ugen g "My project idea" --interactive
```

You'll be asked about:

- Project name and type
- Required features (authentication, database, etc.)
- Technology stack preferences
- Deployment preferences

## Templates

ugen includes several built-in templates:

- **react-express** - React frontend with Express.js backend
- **nextjs-fullstack** - Next.js full-stack application
- **vue-express** - Vue.js frontend with Express.js backend
- **angular-nest** - Angular frontend with NestJS backend
- **python-fastapi** - Python FastAPI backend
- **react-native** - React Native mobile app

Use templates with the `-t` flag:

```bash
ugen g "My app" -t react-express
```

## Configuration

UGen stores configuration in `~/.ugen/config.json`.

### Manual Configuration

Edit the config file directly:

```json
{
  "apiKey": "your-api-key",
  "apiUrl": "https://ugen.ufixs.com",
  "autoInstall": true,
  "gitInit": true,
  "defaultOutput": "."
}
```

### Environment Variables

You can also use environment variables:

```bash
export UGEN_API_KEY="your-api-key"
export UGEN_API_URL="https://ugen.ufixs.com"
```

## Generated Project Structure

UGen creates well-structured projects with:

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
git clone https://github.com/pkroshn/ugen.git
cd ugen-cli

# Install dependencies
npm install

# Link for local testing
npm link

# Set development mode
export NODE_ENV=development

# Test the CLI
ugen g "test project" -o ./test
```

### Building

```bash
# Create standalone executables
npm install -g pkg
pkg . --targets node16-win-x64,node16-macos-x64,node16-linux-x64
```

## API Integration

UGen CLI communicates with an AI backend service. The backend:

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
npm install -g ugen-cli
```

**Permission denied:**

```bash
sudo npm install -g ugen-cli
```

**API key issues:**

```bash
ugen config
# Enter your API key when prompted
```

**Generation fails:**

- Check your internet connection
- Verify your API key is correct
- Try again with a simpler project description

### Debug Mode

```bash
export NODE_ENV=development
ugen g "your project" --verbose
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Test locally: `npm link && ugen g "test"`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/pkroshn/ugen.git)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/pkroshn/ugen-cli/discussions)
- 📧 **Email**: support@ufixs.com
- 📖 **Documentation**: [docs.ugen.ufixs.com](https://docs.ugen.ufixs.com)

---

**Made with ❤️ by the UFIXS team**
