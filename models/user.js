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
  userPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
});

const User = mongoose.model('User', userSchema);

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
const createUsers = async () => {
  for (let i = 0; i < users.length; i++) {
    const username = users[i].username;
    const name = users[i].name;
    const email = users[i].email;
    const hashedPassword = users[i].hashedPassword;
    const newUser = await User.create({ username, name, email, hashedPassword });
    console.log(newUser);
  }
};

module.exports = User;
