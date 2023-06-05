const mongoose = require('mongoose');
const { linkRegex } = require('../utils/utils');

const cardSchema = new mongoose.Schema({
  // card name
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // link to the card picture
  link: {
    type: String,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
    },
    required: true,
  },
  // link to the card author's model
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // a list of users who liked the card
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  // card creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
