// Response interceptor middleware
const responseInterceptor = (req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    body = {
      success: true,
      error: false,
      data: body,
      errorMessage: null,
    };
    return originalJson.call(this, body);
  };
  next();
};

const loggingInterceptor = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

const Interceptor = {
  loggingInterceptor,
  responseInterceptor,
};

module.exports = {
  Interceptor,
};
