require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const {validateLogin, validateReg} = require('./middlewares/validators');
const {requestLogger, errorLogger} = require('./middlewares/logger');

const app = express();

const {PORT = 3000, BASE_PATH, JWT_SECRET} = process.env;

const {login, logOut, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');

const allowedCors = [
  'http://192.168.1.2:3000',
  'http://localhost:3000/',
  'http://photokub.domainname.nomoredomains.club',
  'https://photokub.domainname.nomoredomains.club',
  'http://api.photokub.domainname.nomoredomains.club',
  'https://api.photokub.domainname.nomoredomains.club',
  'http://photokub.domainname.nomoredomains.club',
  'http://photokub.domainname.nomoredomains.club/sign-in',
  'http://api.photokub.domainname.nomoredomains.club/signin'
];

const corsOptions = {
  origin: allowedCors,
  optionSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

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

mongoose.connect('mongodb://127.0.0.1:27017/mestodb'
  .then(() => console.log('MongoDB connection established.'))
  .catch((error) => console.error("MongoDB connection failed:", error.message)));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер ${BASE_PATH}`);
  console.log(`секретный jwt ${JWT_SECRET}`)
});

app.use(require('./middlewares/errors'));
