const jwt = require('jsonwebtoken');

const UnauthorizedErr = require('../errors/unauth-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedErr('Ошибка авторизации'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token,  'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedErr('Ошибка авторизации'));
    return;
  }

  req.user = { _id: payload._id };

  next();
};
