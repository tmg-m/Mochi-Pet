const mongoose = require('mongoose');
const Pet = require('../models/pet.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/27017';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to Mongodb');
    return Pet.deleteMany();
  })
  .then(() => {
    return Pet.insertMany(pet);
  })
  .then(createdPets => {
    console.log(`Created ${createdPets.length} pets`);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => console.log(`An error occurred while creating users from the DB: ${error}`));
