const express = require("express");
const bunyan = require("bunyan");
require("dotenv").config();

const { pool } = require("./config/database");
const { initializeDatabase } = require("./config/init-db");

const userRoutes = require("./routes/user.route");

const { Interceptor } = require("./middleware/responseInterceptor");
const { ErrorHandler } = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 9090;

const log = bunyan.createLogger({
  name: "royalchick-be-platform",
  streams: [{ level: "info", stream: process.stdout }],
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection test
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    log.info("Successfully connected to MySQL database");
    connection.release();
  } catch (err) {
    log.error("Could not connect to MySQL database:", err);
    throw err;
  }
}

// Global error handling for unhandled promises
process.on("unhandledRejection", (err) => {
  log.error("Unhandled Promise Rejection:", err);
  // Don't exit the process in production, just log it
  if (process.env.NODE_ENV === "development") {
    process.exit(1);
  }
});

app.use(Interceptor.responseInterceptor);

app.use("/api/users", userRoutes);
app.use("/api/menu", require("./Routes/menu.routes"));
app.use("/api/orders", require("./Routes/order.routes"));
app.use("/api/resturant", require("./Routes/resturant.routes"));
app.use("/api/employee", require("./Routes/employee.routes"));
app.use(ErrorHandler.defaultErrorHandler);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// Need to await database initialization before starting server
async function startServer() {
  try {
    await testConnection();
    await initializeDatabase();

    app.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    log.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
