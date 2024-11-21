const ClientErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'RESOURCE_NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
  CONFLICT: 'CONFLICT',
  FETCH_FAILED: 'FETCH_FAILED',
  BUSINESS_ERROR: 'BUSINESS_ERROR',
};

const InternalErrorCodes = {
  // Database related
  DB_CONNECTION: 'DB_001',
  DB_QUERY: 'DB_002',
  DB_TRANSACTION: 'DB_003',

  // Service related
  SERVICE_ERROR: 'SVC_001',
  EXTERNAL_API: 'SVC_002',

  // System related
  SYSTEM_ERROR: 'SYS_001',
  FILE_SYSTEM: 'SYS_002',
};

const ErrorCodes = { ClientErrorCodes, InternalErrorCodes };

module.exports = { ErrorCodes };
