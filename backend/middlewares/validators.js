const { celebrate, Joi } = require('celebrate');
const  validator  = require('validator');

module.exports.validateReg = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('ссылка не валидна');
        }
        return value;
      }),
  }),
});

module.exports.validateUserId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Введн неверный URL');
        }
        return value;
      }),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
