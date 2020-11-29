const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { userSignup, userLogin } = require('../controllers/users');
const auth = require('../middleware/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), userSignup);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), userLogin);

router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

module.exports = router;
