const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    unique: true,
  },
  petCategory: {
    type: String,
    enum: ['Dog', 'Cat', 'Hamster', 'Fish', 'Birds', 'Other'],
    required: true,
  },
  petGender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  petAge: {
    type: String,
    required: true,
  },
  petColor: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  imageUrl: String,
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
