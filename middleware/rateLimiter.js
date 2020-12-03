const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
});

module.exports = limiter;
