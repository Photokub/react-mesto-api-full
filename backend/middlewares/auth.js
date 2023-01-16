const jwt = require('jsonwebtoken');


const UnauthorizedErr = require('../errors/unauth-err');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new UnauthorizedErr('Ошибка авторизации 401'));
//   }
//
//   const token = authorization.replace('Bearer ', '');
//   let payload;
//
//   try {
//     payload = jwt.verify(token, 'super-strong-secret');
//   } catch (err) {
//     return next(new UnauthorizedErr('Ошибка авторизации 401'));
//   }
//
//   req.user = payload;
//
//   return next();
// };

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  //const token = req.cookies.jwt.valueOf();
  //const token = req.cookies;
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
  //req.user = payload;

  next();
};
