const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const auth = require('./middleware/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(helmet());

app.post('/signin', loginUser);
app.post('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on Port ${PORT}`);
});
