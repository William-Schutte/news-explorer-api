const express = require('express');
const auth = require('./middleware/auth');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');
const { userLogin, userSignup } = require('./controllers/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/news-exp-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.post('/signup', userSignup);
app.post('/signin', userLogin);

app.use(auth);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

app.listen(PORT);