const { NODE_ENV, JWT_KEY } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new AuthError('Authorization Required');
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY : 'secret_key');
  } catch (err) {
    const err2 = new AuthError('Authorization Verification Failure');
    next(err2);
  }

  req.user = payload;
  next();
};

// This function verifies the jwt sent in the headers of the request sent by the client. If
// the token is verified, the user property of the request is assigned the payload of the token.
