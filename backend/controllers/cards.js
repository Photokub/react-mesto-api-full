const Card = require('../models/cards');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestErr = require('../errors/forbidden-err');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id
    const card = (await Card.create({name, link, owner: ownerId}));
    console.log(req.user)
    console.log(card)
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr('Ошибка валидации'));
    }
    return next(err);
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findById({ _id: req.params._id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Невозможно найти');
      }
      if (!card.owner.equals(userId)) {
        throw new ForbiddenError('Невозможно удалить');
      }
      card.remove({ _id: req.params._id })
        .then(() => res.send({ message: 'Карточка удалена' })).catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return new NotFoundError('Карточка не обнаружена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr({ message: 'Переданы некорректные данные для постановки/снятии лайка.' }));
      }
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return new NotFoundError('Карточка не обнаружена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr({ message: 'Переданы некорректные данные для постановки/снятии лайка.' }));
      }
      return next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
};
