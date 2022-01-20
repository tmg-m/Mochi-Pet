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
  },
  petName: {
    type: String,
  },
  petAge: {
    type: String,
  },
  petColor: {
    type: String,
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
