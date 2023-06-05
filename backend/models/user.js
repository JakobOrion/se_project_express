const mongoose = require('mongoose');
const { linkRegex } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  // username
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // user information
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // link to the avatar
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
