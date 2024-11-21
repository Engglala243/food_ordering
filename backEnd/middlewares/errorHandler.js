const { AppError, APIError } = require("../utils/customErrors.js");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const isOperational = err.isOperational;

  if (err instanceof AppError) {
    return res.status(statusCode).json({
      success: isOperational,
      status: statusCode,
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  if (err instanceof APIError) {
    const data = err.apiData;
    return res.status(statusCode).json({
      success: isOperational,
      status: statusCode,
      message,
      data,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  return res.status(500).json({
    error: {
      message: "Internal Server Error",
    },
  });
};

module.exports = errorHandler;
