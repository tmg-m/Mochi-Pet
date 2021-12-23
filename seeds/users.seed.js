const mongoose = require('mongoose');
const User = require('../models/user.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/27017';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to Mongodb');
    return User.deleteMany();
  })
  .then(() => {
    return User.insertMany(user)
  })
  .then((createdUsers)=> {
    console.log(`Created ${createdUsers.length} users`);
  })
  .then(() => {

    mongoose.connection.close();
     })
.catch((error) =>
console.log(`An error occurred while creating users from the DB: ${error}`)
);

//optimizar

const user = [
    {
    username: JuanJose,
    email: {
        type: juanjose@gmail.com,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: [true, 'password is required'],
    },
    }
]