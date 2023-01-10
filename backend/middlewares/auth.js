const jwt = require('jsonwebtoken');

const UnauthorizedErr = require('../errors/unauth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedErr('Ошибка авторизации 401'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new UnauthorizedErr('Ошибка авторизации 401'));
  }

  req.user = payload;

  return next();
};
