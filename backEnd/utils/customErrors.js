<<<<<<< HEAD
class AppError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

class APIError extends Error {
  constructor(message, statusCode, isOperational, data) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.apiData = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  AppError,
  APIError,
};
=======
class AppError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

class APIError extends Error {
  constructor(message, statusCode, isOperational, data) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.apiData = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  AppError,
  APIError,
};
>>>>>>> master
