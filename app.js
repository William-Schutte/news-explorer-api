require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const limiter = require('./middleware/rateLimiter');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/index');

const { PORT, DB_ADDRESS } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Express Rate Limiter will limit too many requests from the same IP
app.use(limiter);
// NPM Helmet middleware, sets HTTP headers
app.use(helmet());

// Log the request and parse the body into JSON
app.use(requestLogger);
app.use(bodyParser.json());

// Main router for all requests
app.use(routes);

// Log any errors, then return error code/message with handler
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
