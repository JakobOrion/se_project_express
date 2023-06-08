const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkErrors } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('Not Found'))
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const getUserId = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send({ data: user }))
      .catch(() => {
        res.status(500).send({ message: 'Error' });
      });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      checkErrors({ res, err });
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  loginUser,
  updateProfile,
  updateAvatar,
};
