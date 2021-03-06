const express = require('express');
const res = require('express/lib/response');
const User = require('../models/user');
const { isLoggedIn } = require('../middlewares');

// bcrypt files
const bcrypt = require('bcryptjs');
const { exists, db } = require('../models/user');
const saltRounds = 10;

function authRoutes() {
  const router = express.Router();

  // sign in
  router.get('/logIn', (req, res, next) => {
    //if user is logged in ,line 17-20
    if (req.session.currentUser) {
      return res.redirect('/');
    }

    res.render('authentication/logIn.hbs');
  });

  router.post('/logIn', async (req, res, next) => {
    const { username, password } = req.body;
    try {
      if (!username) {
        return res.render('authentication/logIn', { errorMessage: 'Enter your username' });
      }
      if (!password) {
        return res.render('authentication/logIn', { errorMessage: 'Enter your password' });
      }
      const dbUser = await User.findOne({ username });
      if (!dbUser) {
        return res.render('authentication/logIn', { errorMessage: 'Enter correct username' });
      }
      const { _id, hashedPassword } = dbUser;
      if (bcrypt.compareSync(password, hashedPassword)) {
        req.session.currentUser = {
          _id,
          username,
        };
        res.redirect('/');
      } else {
        return res.render('authentication/logIn', { errorMessage: 'Your username or password is Incorrect' });
      }
    } catch (err) {
      next(err);
    }
  });

  // sign up
  router.get('/signUp', (req, res, next) => {
    //if user is logged in ,line 50-53
    if (req.session.currentUser) {
      return res.redirect('/pet-create');
    }

    res.render('authentication/signUp.hbs');
  });

  router.post('/signUp', async (req, res, next) => {
    const { username, name, email, password, passwordTwo } = req.body;

    try {
      if (password !== passwordTwo) {
        console.log('passwords does not match');
        return res.render('authentication/signUp', { errorMessage: "Passwords doesn't match !" });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await User.create({
        username,
        name,
        email,
        hashedPassword,
      });

      // auto login after user creation
      const dbUser = await User.findOne({ username });
      const { _id } = dbUser;
      if (dbUser) {
        req.session.currentUser = {
          _id,
          username,
        };
      }
      res.redirect('/pet/pet-create');
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = authRoutes;
