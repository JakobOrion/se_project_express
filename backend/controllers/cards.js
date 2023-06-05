const Card = require('../models/card');
const { checkErrors } = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('Not Found'))
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('Not Found'))
    .then(() => res.status(200).send({ message: 'Card deleted' }))
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      checkErrors({ res, err });
    });
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('Not Found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      checkErrors({ res, err });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
};
