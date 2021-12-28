const express = require('express');
const res = require('express/lib/response');
const User = require('../models/user');

// bcrypt files
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function authRoutes() {
  const router = express.Router();

  router.get('/signUp', (req, res, next) => {
    res.render('authentication/signUp.hbs');
  });

  router.post('/signUp', async (req, res, next) => {
    const { username, email, password, passwordTwo } = req.body;

    try {
      if (password !== passwordTwo) {
        console.log('passwords does not match');
        return res.render('authentication/signUp', { errorMessage: "Passwords doesn't match !" })
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await User.create({
        username,
        email,
        hashedPassword,
      });
      res.redirect('/');
      console.log('a user is created!');
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = authRoutes;
