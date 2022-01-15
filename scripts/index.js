const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myApp-db';

const User = require('../models/user');

const users = [
  {
    username: 'fede',
    name: 'federico',
    email: 'federico@gmail.com',
    hashedPassword: 'prueba',
  },
  {
    username: 'mary',
    name: 'maría',
    email: 'mariam@gmail.com',
    hashedPassword: 'probando',
  },
  {
    username: 'josele',
    name: 'jose luis',
    email: 'josel@gmail.com',
    hashedPassword: 'otraprueba',
  },
  {
    username: 'sandreta',
    name: 'sandra',
    email: 'sandrar@gmail.com',
    hashedPassword: 'unamas',
  },
  {
    username: 'antoniete',
    name: 'antonio',
    email: 'anthony@gmail.com',
    hashedPassword: 'esperoquefuncione',
  },
  {
    username: 'carlamagna',
    name: 'carla',
    email: 'krla@gmail.com',
    hashedPassword: 'unodos',
  },
  {
    username: 'alvarinho',
    name: 'alvaro',
    email: 'alvaro29@gmail.com',
    hashedPassword: 'vamospalla',
  },
  {
    username: 'rafaella',
    name: 'rafaella',
    email: 'karra@gmail.com',
    hashedPassword: 'explota',
  },
  {
    username: 'torontino',
    name: 'quentin',
    email: 'cinefilo@gmail.com',
    hashedPassword: 'rodando',
  },
  {
    username: 'sole',
    name: 'soledad',
    email: 'solita@gmail.com',
    hashedPassword: 'alone',
  },
  {
    username: 'kevinspencer',
    name: 'kevin',
    email: 'loco@gmail.com',
    hashedPassword: 'pastis',
  },
  {
    username: 'chipirona',
    name: 'marta',
    email: 'alsol@gmail.com',
    hashedPassword: 'todoslosdias',
  },
  {
    username: 'reySol',
    name: 'luis',
    email: 'francia@gmail.com',
    hashedPassword: 'historia',
  },
  {
    username: 'eli',
    name: 'elisa',
    email: 'simpsons@gmail.com',
    hashedPassword: 'yuhuu',
  },
  {
    username: 'homero',
    name: 'homer',
    email: 'homerj@gmail.com',
    hashedPassword: 'ouh',
  },
];

const runScript = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`connected to ${MONGO_URI}`);
    User.deleteMany();
    User.insertMany(users);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log('conection closed');
  }
};

runScript();
