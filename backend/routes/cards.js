const router = require('express').Router();

const { validateCardCreation, validateCardId } = require('../middlewares/validators');

const {
  createCard, getCards, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardCreation, createCard);
router.delete('/:_id', validateCardId, deleteCard);
router.put('/:_id/likes', validateCardId, putLike);
router.delete('/:_id/likes', validateCardId, deleteLike);
 //router.delete('/:_id',  deleteCard);
// router.put('/:_id/likes',  putLike);
// router.delete('/:_id/likes',  deleteLike);

module.exports = router;
