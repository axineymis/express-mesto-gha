const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  // createUser,
  getUsers,
  getUser,
  patchAvatar,
  patchProfile,
  getMe,
} = require('../controllers/users');

// router.post("/", createUser);
router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
      )
      .required(),
  }),
}), patchAvatar);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchProfile);

router.get('/me', getMe);

module.exports = router;
