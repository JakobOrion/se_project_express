const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '60e49e510aa3fff07be4fd23',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on Port ${PORT}`);
});
