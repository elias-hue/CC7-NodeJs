const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!req.headers.authorization?.startsWith('Bearer ') || !token) {
    return next(new AppError(
      401,
      'UNAUTHORIZED_ACCESS',
      'Authentification required'
    ));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch {
    next(new AppError(
      401,
      'UNAUTHORIZED_ACCESS',
      'Authentification required'
    ));
  }
}

module.exports = verifyToken;