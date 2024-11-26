<<<<<<< HEAD
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
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
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
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
