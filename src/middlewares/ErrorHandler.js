function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    code: err.code || "INTERNAL_SERVER_ERROR",
    message: err.isOperational
      ? err.message
      : "Une erreur interne est survenue"
  });
}

module.exports = errorHandler;