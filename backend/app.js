require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { validateLogin, validateReg } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

//const { PORT = 3001, BASE_PATH } = process.env;
const { PORT = 3000, BASE_PATH, JWT_SECRET } = process.env;

const { login, logOut, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');

const allowedCors = [
  'http://192.168.1.2:3000',
  'http://localhost:3000/',
  'http://photokub.domainname.nomoredomains.club/',
  'https://photokub.domainname.nomoredomains.club/',
  'http://api.photokub.domainname.nomoredomains.club/',
  'https://api.photokub.domainname.nomoredomains.club/',
  'http://photokub.domainname.nomoredomains.club/',
  'http://photokub.domainname.nomoredomains.club/sign-in',
  'http://api.photokub.domainname.nomoredomains.club/signin'
];

// app.use(function(req, res, next) {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//
//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     return res.end();
//   }
//
//   next();
// });

const corsOptions = {
  origin: allowedCors,
  optionSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// mongoose.connect('mongodb://localhost:27017/mestodb', () => {
//   console.log('Подключение базы mestodb');
// });

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', () => {
  console.log('Подключение базы mestodb');
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);  // подключаем логгер запросов

//краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateReg, createUser);
app.post('/signin', validateLogin, login);
app.post('/signout', logOut);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError('404 Старница не найдена')));

app.use(errorLogger); // подключаем логгер ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер ${BASE_PATH}`);
  console.log(`секретный jwt ${JWT_SECRET}`)
});

app.use(require('./middlewares/errors'));
