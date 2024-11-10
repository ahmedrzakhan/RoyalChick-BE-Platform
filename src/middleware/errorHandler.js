// Error handling middleware
const defaultErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error details
  console.error(
    `HTTP Status: ${status} Error Message: ${message} Path: ${
      req.url
    } Method: ${req.method} Timestamp: ${new Date().toISOString()}`,
  );
  console.error(err.stack);

  res.status(status).json({
    success: false,
    error: true,
    data: null,
    errorMessage: { message },
  });
};

const ErrorHandler = {
  defaultErrorHandler,
};

module.exports = {
  ErrorHandler,
};
