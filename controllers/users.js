const { json } = require('body-parser');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.userLogin(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_KEY : 'secret_key',
        { expiresIn: '7d' }
      );
      res.cookie('token', token, { httpOnly: true });
      res.status(201).send({
        token,
        user: {
          name: user.name,
          email: user.email,
        }
      });
    })
    .catch(next);
}

const userSignup = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ name, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch(next);
  })
}

module.exports = { getUserInfo, userLogin, userSignup };
