const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
