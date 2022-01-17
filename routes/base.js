const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');
const Favorite = require('../models/favorite');

function baseRoutes() {
  const router = express.Router();
  router.get('/', async (req, res, next) => {
    const isLogged = req.session.currentUser;
    if (!isLogged) {
      return res.render('index');
    }
    try {
      const user = req.session.currentUser._id;
      const userInfo = await User.findById(user);
      const pets = await Pet.find({});
      return res.render('home.hbs', { pets, user, userInfo, isLogged });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const favorites = await Favorite.find({ user: user._id }).populate('pet');

      res.render('profile.hbs', { favorites });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = baseRoutes;
