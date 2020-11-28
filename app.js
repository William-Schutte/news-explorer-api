const express = require('express');
const auth = require('./middleware/auth');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');
const { userLogin, userSignup } = require('./controllers/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/news-exp-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(bodyParser.json());

app.post('/signup', userSignup);
app.post('/signin', userLogin);

app.use(auth);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

app.use(errorLogger);
app.use((err, req, res, next) => {
  // Error handling
  let { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: (statusCode === 500) ? 'Server error' : message
  });
});
app.listen(PORT);