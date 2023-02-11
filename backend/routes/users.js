const router = require('express').Router();

const {validateUserId, validateUserInfo, validateAvatarUpdate} = require('../middlewares/validators');

const {
  getUserProfile, getUsers, updateUserData, patchUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserProfile);
router.get('/:userId', validateUserId, getUserInfo);

router.patch('/me', validateUserInfo, updateUserData);
router.patch('/me/avatar', validateAvatarUpdate, patchUserAvatar);

module.exports = router;
