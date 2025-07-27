const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
// const mongoSanitize = require('express-mongo-sanitize'); // Disabled due to compatibility issue
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { connectDB } = require('./config/database');

// Initialize app
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    const app = express();

    // Trust proxy for deployment platforms
    app.set('trust proxy', 1);

    // Security middleware
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:3000'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
      message: {
        error: 'Too many requests from this IP, please try again later.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

    app.use('/api', limiter);

    // CORS configuration
    const corsOptions = {
      origin: function (origin, callback) {
        const allowedOrigins = [
          process.env.FRONTEND_URL || 'http://localhost:3000',
          process.env.PROD_FRONTEND_URL,
          'http://localhost:3000',
          'http://localhost:3001',
        ].filter(Boolean);
        
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    };

    app.use(cors(corsOptions));

    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(cookieParser(process.env.COOKIE_SECRET));

    // Data sanitization against NoSQL query injection
    // app.use(mongoSanitize()); // Temporarily disabled due to compatibility issue

    // Compression middleware
    app.use(compression());

    // Logging middleware
    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
    } else {
      app.use(morgan('combined'));
    }

    // Session configuration (now that DB is connected)
    app.use(session({
      secret: process.env.SESSION_SECRET || 'fallback-secret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600,
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      },
    }));

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      });
    });

    // Import and use routes
    const authRoutes = require('./routes/authRoutes');
    const postRoutes = require('./routes/postRoutes');
    const adminRoutes = require('./routes/adminRoutes');
    const messageRoutes = require('./routes/messageRoutes');
    const statsRoutes = require('./routes/statsRoutes');

    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/stats', statsRoutes);

    // Default route
    app.get('/', (req, res) => {
      res.json({
        message: 'Modern Blog Platform API',
        version: '2.0.0',
        status: 'Running',
        documentation: '/api/docs',
      });
    });

    // 404 handler for all undefined routes
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
      });
    });

    // Global error handler
    app.use(errorHandler);

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      mongoose.connection.close().then(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      mongoose.connection.close().then(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Modern Blog Platform API running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔒 Security: Enhanced`);
      console.log(`🗄️ Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
