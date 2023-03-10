const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const UnauthorizedErr = require('../errors/unauth-err');
const {JWT_SECRET} = process.env;

const login = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({email}).select('+password');
    if (!user) {
      return next(new UnauthorizedErr('Ошибка авторизации 401'));
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return next(new UnauthorizedErr('Ошибка авторизации 401'));
    }
    const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: '7d'});
    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }).send({_id: user._id, user: user.email, message: 'Токен jwt передан в cookie'});
  } catch (err) {
    throw next(err);
  }
};

const logOut = (req, res, next) => {
  res.clearCookie('jwt').send({message: 'Успешный выход из аккаунта'})
    .catch(next);
}

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw next(new BadRequestErr('Переданы некорректные данные пользователя'));
      }
      if (err.code === 11000) {
        throw next(new ConflictErr(`Пользователь с ${email} уже существует`));
      }
      throw next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

function getUserData(id, res, next) {
  if (!id) {
    return next(new NotFoundError('Пользователь не найден'));
  }
  return res.send(id);
}

const updateUserData = (req, res, next) => {
  const {body} = req;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: body.name,
      about: body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Ничего не найдено'))
    .then((user) => getUserData(user, res, next))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw next(new BadRequestErr('Передан невалидный id пользователя'));
      }
      throw next(err);
    });
};

const patchUserAvatar = (req, res, next) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => getUserData(user, res, next))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw next(new BadRequestErr('Переданы некорректные данные при обновлении аватара'));
      }
      throw next(err);
    });
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => getUserData(user, res))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => getUserData(user, res, next))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestErr('Переданы некорректные данные пользователя'));
      }
      return next(err);
    });
};

module.exports = {
  login,
  logOut,
  createUser,
  getUsers,
  patchUserAvatar,
  updateUserData,
  getUserProfile,
  getUserInfo,
};
