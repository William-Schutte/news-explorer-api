const express = require('express');
const auth = require('./middleware/auth');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(auth);
app.use('/users/me', usersRouter);
app.use('/articles', articlesRouter);

app.listen(PORT);