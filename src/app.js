const express = require('express');
const bunyan = require('bunyan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const logger = require('./config/logger');
const { CONFIG } = require('./config/config');
const { CONSTANTS } = require('./config/constants');

const { pool } = require('./config/database');
const { initializeDatabase } = require('./config/init-db');

const { routerV1 } = require('./Routes/index');

const { Interceptor } = require('./middleware/responseInterceptor');
const { ErrorHandler } = require('./middleware/errorHandler');
const app = express();

// Create a Bunyan logger
const log = bunyan.createLogger({
  name: 'royalchick-be-platform',
  streams: [{ level: 'info', stream: process.stdout }],
});

// 1. Security middleware first
app.use(
  helmet({
    frameguard: {
      action: 'deny', // Completely prevent framing
    },
  }),
);

const allowedOrigins = {
  STAGING: ['https://api-staging.peekabox.co', 'http://localhost:8100'],
  PRODUCTION: ['api.peekabox.co'],
};

const corsOptions = {
  origin: (origin, callback) => {
    const environment = CONFIG.NODE_ENV;
    const currentAllowedOrigins = allowedOrigins[environment];

    if (
      (!origin && environment != CONSTANTS.PRODUCTION_ENV) ||
      currentAllowedOrigins.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// 2. Basic middleware
app.use(express.json());
app.use(logger.requestIdMiddleware());
app.use(logger.requestLogger());
app.use(Interceptor.responseInterceptor);

// 3. CORS error handler (after basic middleware but before routes)
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS_ERROR',
      message: 'Origin not allowed',
    });
  }
  next(err);
});

// 4. API Routes
// app.use('/api/v1', routerV1);

// 5. 404 Handler (after routes but before error handlers)
// app.use((req, res) => {
//   res.status(404).json({ message: 'Resource not found' });
// });

// 6. Error handling middleware (always at the end, but before server start)
app.use(ErrorHandler.defaultErrorHandler);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    error: true,
    data: null,
    errorMessage: 'Something went wrong',
  });
});

// 7. Database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    log.info('Successfully connected to MySQL database');
    connection.release();
  } catch (err) {
    log.error('Could not connect to MySQL database:', err);
    throw err;
  }
}

// Global error handling for unhandled promises
process.on('unhandledRejection', (err) => {
  log.error('Unhandled Promise Rejection:', err);
  // Don't exit the process in production, just log it
  if (process.env.NODE_ENV === 'development') {
    process.exit(1);
  }
});

app.use(Interceptor.responseInterceptor);

app.use('/api/users', require('./Routes/user.route'));
app.use('/api/menu', require('./Routes/menu.routes'));
app.use('/api/orders', require('./Routes/order.routes'));
app.use('/api/restaurant', require('./Routes/restaurant.routes'));
app.use('/api/employee', require('./Routes/employee.routes'));
app.use(ErrorHandler.defaultErrorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// 8. Start server
// Need to await database initialization before starting server
async function startServer() {
  try {
    await testConnection();
    await initializeDatabase();

    app.listen(CONFIG.PORT, () => {
      log.info(`Server is running on port ${CONFIG.PORT}`);
    });
  } catch (error) {
    log.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
