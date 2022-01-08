const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  petName: {
    type: String,
  },
  petType: {
    type: String,
  },
  petGender: {
    type: String,
  },
  petColor: {
    type: String,
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
