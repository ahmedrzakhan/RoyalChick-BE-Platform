const { ErrorCodes } = require('./errorCodes');
const AppError = require('./baseError');

class ValidationError extends AppError {
  constructor(message, context = {}) {
    super(message, 400, context);
    this.name = 'ValidationError';
    this.publicMessage = message;
    this.clientErrorCode = ErrorCodes.ClientErrorCodes.VALIDATION_ERROR;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource', context = {}) {
    super(`${resource} not found`, 404, context);
    this.name = 'NotFoundError';
    this.publicMessage = `${resource} not found`;
    this.clientErrorCode = ErrorCodes.ClientErrorCodes.NOT_FOUND;
  }
}

class FetchError extends AppError {
  constructor(message = 'Failed to fetch data', context = {}) {
    super(message, 500, context);
    this.name = 'FetchError';
    this.publicMessage = 'Failed to retrieve data from the server';
    this.clientErrorCode = ErrorCodes.ClientErrorCodes.FETCH_FAILED;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', context = {}) {
    super(message, 401, context);
    this.name = 'UnauthorizedError';
    this.publicMessage = 'Unauthorized access';
    this.clientErrorCode = ErrorCodes.ClientErrorCodes.UNAUTHORIZED;
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden', context = {}) {
    super(message, 403, context);
    this.name = 'ForbiddenError';
    this.publicMessage = 'Access forbidden';
    this.clientErrorCode = ErrorCodes.ClientErrorCodes.FORBIDDEN;
  }
}

class ConflictError extends AppError {
  constructor(message, context = {}) {
    super(message, 409, context);
    this.name = 'ConflictError';
    this.publicMessage = message;
    this.clientErrorCode = ClientErrorCodes.CONFLICT;
  }
}

const ClientErrors = {
  ValidationError,
  FetchError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};

module.exports = { ClientErrors };
