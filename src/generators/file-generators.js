class FileGenerators {
    generatePackageJson() {
      return JSON.stringify({
        name: 'generated-project',
        version: '1.0.0',
        description: 'Generated project using UGen AI',
        scripts: {
          'start': 'node server/index.js',
          'dev': 'concurrently "npm run server" "npm run client"',
          'server': 'nodemon server/index.js',
          'client': 'react-scripts start',
          'build': 'react-scripts build',
          'test': 'react-scripts test',
          'eject': 'react-scripts eject'
        },
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'react-router-dom': '^6.8.0',
          'axios': '^1.3.0',
          'express': '^4.18.2',
          'cors': '^2.8.5',
          'dotenv': '^16.0.3',
          'mongoose': '^7.0.0',
          'bcryptjs': '^2.4.3',
          'jsonwebtoken': '^9.0.0'
        },
        devDependencies: {
          'react-scripts': '^5.0.1',
          'nodemon': '^2.0.20',
          'concurrently': '^7.6.0',
          '@testing-library/react': '^13.4.0',
          '@testing-library/jest-dom': '^5.16.5',
          '@testing-library/user-event': '^14.4.3'
        },
        browserslist: {
          production: [
            '>0.2%',
            'not dead',
            'not op_mini all'
          ],
          development: [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version'
          ]
        }
      }, null, 2);
    }
  
    generateNextJSPackageJson() {
      return JSON.stringify({
        name: 'generated-nextjs-project',
        version: '1.0.0',
        description: 'Generated Next.js project using UGen AI',
        scripts: {
          'dev': 'next dev',
          'build': 'next build',
          'start': 'next start',
          'lint': 'next lint'
        },
        dependencies: {
          'next': '^13.0.0',
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'mongoose': '^7.0.0'
        },
        devDependencies: {
          'eslint': '^8.0.0',
          'eslint-config-next': '^13.0.0'
        }
      }, null, 2);
    }
  
    generateReadme(prompt) {
      return `# Generated Project
  
  This project was generated using UGen AI based on the prompt:
  **"${prompt}"**
  
  ## 🚀 Getting Started
  
  ### Prerequisites
  - Node.js (v16 or higher)
  - npm or yarn
  - MongoDB (local or cloud)
  
  ### Installation
  
  1. **Install dependencies:**
     \`\`\`bash
     npm install
     \`\`\`
  
  2. **Set up environment variables:**
     \`\`\`bash
     cp .env.example .env
     \`\`\`
     
     Edit the \`.env\` file with your configuration:
     - MongoDB connection string
     - JWT secret
     - Other API keys as needed
  
  3. **Start the development servers:**
     \`\`\`bash
     npm run dev
     \`\`\`
  
  4. **Open your browser:**
     - Frontend: [http://localhost:3000](http://localhost:3000)
     - Backend API: [http://localhost:5000](http://localhost:5000)
  
  ## 📁 Project Structure
  
  \`\`\`
  ├── src/                    # React frontend
  │   ├── components/         # Reusable components
  │   ├── pages/              # Page components
  │   ├── context/            # React context
  │   ├── utils/              # Utility functions
  │   └── services/           # API services
  ├── server/                 # Express backend
  │   ├── routes/             # API routes
  │   ├── models/             # Database models
  │   ├── middleware/         # Custom middleware
  │   └── config/             # Configuration files
  ├── public/                 # Static assets
  └── tests/                  # Test files
  \`\`\`
  
  ## 🛠️ Available Scripts
  
  - \`npm run dev\` - Start both frontend and backend in development mode
  - \`npm run client\` - Start only the React frontend
  - \`npm run server\` - Start only the Express backend
  - \`npm run build\` - Build the frontend for production
  - \`npm test\` - Run tests
  - \`npm start\` - Start the production server
  
  ## 🔧 Configuration
  
  ### Environment Variables
  
  Create a \`.env\` file in the root directory:
  
  \`\`\`env
  # Database
  MONGODB_URI=mongodb://localhost:27017/your-database
  
  # Authentication
  JWT_SECRET=your-super-secret-jwt-key
  JWT_EXPIRE=7d
  
  # Server
  PORT=5000
  NODE_ENV=development
  
  # Frontend (if needed)
  REACT_APP_API_URL=http://localhost:5000
  \`\`\`
  
  ## 📚 Features Included
  
  - ✅ React frontend with modern hooks
  - ✅ Express.js backend with RESTful API
  - ✅ MongoDB integration with Mongoose
  - ✅ User authentication with JWT
  - ✅ CORS configuration
  - ✅ Environment variable management
  - ✅ Development and production scripts
  - ✅ Basic error handling
  - ✅ Responsive design foundation
  
  ---
  
  **Generated with ❤️ by UGen AI**
  `;
    }
  
    generateReactApp() {
      return `import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { AppProvider } from './context/AppContext';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import Home from './pages/Home';
  import About from './pages/About';
  import './App.css';
  
  function App() {
    return (
      <AppProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    );
  }
  
  export default App;
  `;
    }
  
    generateReactIndex() {
      return `import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  `;
    }
  
    generateIndexCSS() {
      return `/* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  /* Utility Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .btn {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  .btn-secondary {
    background-color: #6c757d;
  }
  
  .btn-secondary:hover {
    background-color: #545b62;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  `;
    }
  
    generateAppCSS() {
      return `.App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    padding: 2rem 0;
  }
  
  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.9;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Feature Cards */
  .features {
    padding: 4rem 0;
    background: white;
  }
  
  .features h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    color: #333;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .feature-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .feature-card p {
    color: #666;
    line-height: 1.6;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero p {
      font-size: 1rem;
      padding: 0 1rem;
    }
    
    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .features h2 {
      font-size: 2rem;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
  `;
    }
  
    generateHeader() {
      return `import React from 'react';
  import { Link } from 'react-router-dom';
  
  const Header = () => {
    return (
      <header style={headerStyle}>
        <div className="container">
          <nav style={navStyle}>
            <Link to="/" style={logoStyle}>
              ProjectGen
            </Link>
            <ul style={navListStyle}>
              <li>
                <Link to="/" style={navLinkStyle}>Home</Link>
              </li>
              <li>
                <Link to="/about" style={navLinkStyle}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  const headerStyle = {
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };
  
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0'
  };
  
  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#667eea',
    textDecoration: 'none'
  };
  
  const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0
  };
  
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  };
  
  export default Header;
  `;
    }
  
    generateFooter() {
      return `import React from 'react';
  
  const Footer = () => {
    return (
      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div>
              <h3 style={footerTitleStyle}>ProjectGen</h3>
              <p style={footerTextStyle}>
                AI-powered project generation made simple.
              </p>
            </div>
            <div>
              <p style={footerTextStyle}>
                © {new Date().getFullYear()} ProjectGen. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  const footerStyle = {
    background: '#333',
    color: 'white',
    padding: '2rem 0',
    marginTop: 'auto'
  };
  
  const footerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  };
  
  const footerTitleStyle = {
    margin: '0 0 0.5rem 0',
    color: '#667eea'
  };
  
  const footerTextStyle = {
    margin: 0,
    opacity: 0.8
  };
  
  export default Footer;
  `;
    }
  
    generateHomePage() {
      return `import React from 'react';
  
  const Home = () => {
    return (
      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Welcome to Your Generated Project! 🚀</h1>
            <p>
              This project was created using ProjectGen AI. 
              Start building amazing things with this foundation!
            </p>
            <div className="hero-buttons">
              <button className="btn">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2>What's Included</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>⚛️ React Frontend</h3>
                <p>
                  Modern React application with hooks, routing, and context API 
                  for state management.
                </p>
              </div>
              <div className="feature-card">
                <h3>🚀 Express Backend</h3>
                <p>
                  RESTful API built with Express.js, including authentication 
                  and database integration.
                </p>
              </div>
              <div className="feature-card">
                <h3>🛡️ Authentication</h3>
                <p>
                  Secure JWT-based authentication system with user registration 
                  and login functionality.
                </p>
              </div>
              <div className="feature-card">
                <h3>📊 Database Ready</h3>
                <p>
                  MongoDB integration with Mongoose for data modeling and 
                  database operations.
                </p>
              </div>
              <div className="feature-card">
                <h3>🎨 Responsive Design</h3>
                <p>
                  Mobile-first responsive design that looks great on all devices 
                  and screen sizes.
                </p>
              </div>
              <div className="feature-card">
                <h3>⚡ Development Tools</h3>
                <p>
                  Pre-configured development environment with hot reloading and 
                  testing setup.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Home;
  `;
    }
  
    generateAboutPage() {
      return `import React from 'react';
  
  const About = () => {
    return (
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
            About This Project
          </h1>
          
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>
              Generated by ProjectGen AI
            </h2>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
              This project was automatically generated using ProjectGen AI, an intelligent 
              project scaffolding tool that creates complete, production-ready applications 
              based on natural language descriptions.
            </p>
            
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>
              🛠️ Technology Stack
            </h3>
            <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Frontend:</strong> React 18 with modern hooks and routing</li>
              <li><strong>Backend:</strong> Node.js with Express.js framework</li>
              <li><strong>Database:</strong> MongoDB with Mongoose ODM</li>
              <li><strong>Authentication:</strong> JWT-based secure authentication</li>
              <li><strong>Styling:</strong> CSS3 with responsive design principles</li>
            </ul>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              border: '1px solid #e9ecef',
              marginTop: '2rem'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                💡 Pro Tip
              </h4>
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                This generated code serves as a solid foundation for your project. 
                Feel free to customize, extend, and modify it to fit your specific needs. 
                The structure follows industry best practices and is designed to scale with your application.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  `;
    }
  
    generateApiUtils() {
      return `import axios from 'axios';
  
  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Request interceptor to add auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = \`Bearer \${token}\`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  // API functions
  export const authAPI = {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
    getCurrentUser: () => api.get('/api/auth/me'),
    logout: () => {
      localStorage.removeItem('token');
      return Promise.resolve();
    }
  };
  
  export const userAPI = {
    getProfile: () => api.get('/api/user/profile'),
    updateProfile: (data) => api.put('/api/user/profile', data),
    deleteAccount: () => api.delete('/api/user/account')
  };
  
  export default api;
  `;
    }
  
    generateAppContext() {
      return `import React, { createContext, useContext, useReducer, useEffect } from 'react';
  import { authAPI } from '../utils/api';
  
  // Initial state
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  };
  
  // Action types
  const ActionTypes = {
    SET_LOADING: 'SET_LOADING',
    SET_USER: 'SET_USER',
    SET_ERROR: 'SET_ERROR',
    LOGOUT: 'LOGOUT'
  };
  
  // Reducer
  const appReducer = (state, action) => {
    switch (action.type) {
      case ActionTypes.SET_LOADING:
        return { ...state, loading: action.payload };
      case ActionTypes.SET_USER:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: !!action.payload,
          loading: false,
          error: null
        };
      case ActionTypes.SET_ERROR:
        return { ...state, error: action.payload, loading: false };
      case ActionTypes.LOGOUT:
        return { ...initialState, loading: false };
      default:
        return state;
    }
  };
  
  // Create context
  const AppContext = createContext();
  
  // Provider component
  export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
  
    // Check authentication on app load
    useEffect(() => {
      checkAuth();
    }, []);
  
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await authAPI.getCurrentUser();
          dispatch({ type: ActionTypes.SET_USER, payload: response.data.user });
        } else {
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };
  
    const login = async (credentials) => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const response = await authAPI.login(credentials);
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
        
        return { success: true };
      } catch (error) {
        const message = error.response?.data?.message || 'Login failed';
        dispatch({ type: ActionTypes.SET_ERROR, payload: message });
        return { success: false, error: message };
      }
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      dispatch({ type: ActionTypes.LOGOUT });
    };
  
    const value = {
      ...state,
      login,
      logout
    };
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
  
  // Custom hook to use the context
  export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useApp must be used within an AppProvider');
    }
    return context;
  };
  
  export default AppContext;
  `;
    }
  
    generateServerIndex() {
      return `const express = require('express');
  const cors = require('cors');
  const path = require('path');
  const connectDB = require('./config/database');
  require('dotenv').config();
  
  const app = express();
  const PORT = process.env.PORT || 5000;
  
  // Connect to database
  connectDB();
  
  // Middleware
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  
  // Request logging middleware
  app.use((req, res, next) => {
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
    next();
  });
  
  // API Routes
  app.use('/api', require('./routes/api'));
  app.use('/api/auth', require('./routes/auth'));
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });
  
  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
  }
  
  // Global error handler
  app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  });
  
  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on port \${PORT}\`);
    console.log(\`🌍 Environment: \${process.env.NODE_ENV || 'development'}\`);
    console.log(\`📝 API Documentation: http://localhost:\${PORT}/api\`);
  });
  `;
    }
  
    generateApiRoutes() {
      return `const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  
  // Public routes
  router.get('/', (req, res) => {
    res.json({ 
      message: 'API is running!',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        health: '/health'
      }
    });
  });
  
  // Sample public route
  router.get('/hello', (req, res) => {
    res.json({ 
      message: 'Hello from your generated API!',
      timestamp: new Date().toISOString()
    });
  });
  
  // Protected route example
  router.get('/protected', auth, (req, res) => {
    res.json({ 
      message: 'This is a protected route',
      user: req.user.id
    });
  });
  
  module.exports = router;
  `;
    }
  
    generateAuthRoutes() {
      return `const express = require('express');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  const auth = require('../middleware/auth');
  
  const router = express.Router();
  
  // Register user
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and password'
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      const user = new User({
        name,
        email,
        password: hashedPassword
      });
  
      await user.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during registration'
      });
    }
  });
  
  // Login user
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password'
        });
      }
  
      // Check if user exists
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );
  
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  });
  
  // Get current user
  router.get('/me', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  });
  
  module.exports = router;
  `;
    }
  
    generateUserModel() {
      return `const mongoose = require('mongoose');
  
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
  });
  
  // Index for better query performance
  userSchema.index({ email: 1 });
  
  module.exports = mongoose.model('User', userSchema);
  `;
    }
  
    generateAuthMiddleware() {
      return `const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  
  const auth = async (req, res, next) => {
    try {
      // Get token from header
      let token;
      
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
      
      // Check if token exists
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }
      
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await User.findById(decoded.id);
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Token is valid but user not found'
          });
        }
        
        // Add user to request object
        req.user = user;
        next();
        
      } catch (tokenError) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      }
      
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error in authentication'
      });
    }
  };
  
  module.exports = auth;
  `;
    }
  
    generateDatabaseConfig() {
      return `const mongoose = require('mongoose');
  
  const connectDB = async () => {
    try {
      const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectgen-app';
      
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferMaxEntries: 0,
        bufferCommands: false,
      };
  
      const conn = await mongoose.connect(mongoURI, options);
  
      console.log(\`📊 MongoDB Connected: \${conn.connection.host}\`);
      console.log(\`🗃️  Database: \${conn.connection.name}\`);
  
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
  
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });
  
      mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected');
      });
  
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      } else {
        console.log('⚠️  Running in development mode without database');
      }
    }
  };
  
  module.exports = connectDB;
  `;
    }
  
    generateEnvExample() {
      return `# Server Configuration
  PORT=5000
  NODE_ENV=development
  
  # Frontend URL (for CORS)
  FRONTEND_URL=http://localhost:3000
  
  # Database Configuration
  MONGODB_URI=mongodb://localhost:27017/projectgen-app
  
  # JWT Configuration
  JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
  JWT_EXPIRE=7d
  
  # Email Configuration (if using email features)
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=your-app-password
  
  # File Upload Configuration
  MAX_FILE_SIZE=5242880
  UPLOAD_PATH=./public/uploads
  
  # External API Keys (add as needed)
  STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  `;
    }
  
    generateGitignore() {
      return `# Dependencies
  node_modules/
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  lerna-debug.log*
  
  # Runtime data
  pids
  *.pid
  *.seed
  *.pid.lock
  
  # Coverage directory used by tools like istanbul
  coverage/
  *.lcov
  
  # Environment variables
  .env
  .env.local
  .env.development.local
  .env.test.local
  .env.production.local
  
  # Production build
  /build
  /dist
  
  # Next.js build output
  .next
  
  # Nuxt.js build / generate output
  .nuxt
  dist
  
  # Logs
  logs
  *.log
  
  # IDE
  .vscode/
  .idea/
  *.swp
  *.swo
  *~
  
  # OS
  .DS_Store
  .DS_Store?
  ._*
  Thumbs.db
  
  # Uploads directory
  uploads/
  public/uploads/
  
  # Database
  *.sqlite
  *.db
  `;
    }
  
    generateIndexHTML() {
      return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#667eea" />
      <meta name="description" content="Generated project using ProjectGen AI" />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      
      <title>Generated Project - ProjectGen AI</title>
    </head>
    <body>
      <noscript>
        <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
          <h1>JavaScript Required</h1>
          <p>You need to enable JavaScript to run this application.</p>
        </div>
      </noscript>
      <div id="root"></div>
      
      <!-- Loading indicator -->
      <style>
        #root:empty::after {
          content: "Loading...";
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 1.2rem;
          color: #667eea;
        }
      </style>
    </body>
  </html>
  `;
    }
  
    generateManifest() {
      return `{
    "short_name": "ProjectGen App",
    "name": "Generated Project by ProjectGen AI",
    "icons": [
      {
        "src": "favicon.ico",
        "sizes": "64x64 32x32 24x24 16x16",
        "type": "image/x-icon"
      },
      {
        "src": "logo192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "logo512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#667eea",
    "background_color": "#ffffff",
    "description": "A modern web application generated by ProjectGen AI"
  }
  `;
    }
  
    generateAppTest() {
      return `import { render, screen } from '@testing-library/react';
  import { BrowserRouter } from 'react-router-dom';
  import App from './App';
  
  // Mock the AppProvider to avoid context issues in tests
  jest.mock('./context/AppContext', () => ({
    AppProvider: ({ children }) => <div data-testid="app-provider">{children}</div>,
    useApp: () => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: jest.fn(),
      logout: jest.fn()
    })
  }));
  
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };
  
  describe('App Component', () => {
    test('renders without crashing', () => {
      renderApp();
      expect(screen.getByTestId('app-provider')).toBeInTheDocument();
    });
  
    test('renders header component', () => {
      renderApp();
      expect(screen.getByText('ProjectGen')).toBeInTheDocument();
    });
  
    test('renders navigation links', () => {
      renderApp();
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
  
    test('displays welcome message on home page', () => {
      renderApp();
      expect(screen.getByText(/welcome to your generated project/i)).toBeInTheDocument();
    });
  });
  `;
    }
  }
  
  module.exports = FileGenerators;