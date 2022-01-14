const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');

function baseRoutes() {
  const router = express.Router();
  router.get('/', async (req, res, next) => {
    const isLogged = req.session.currentUser;
    if (!isLogged) {
      return res.render('index');
    }
    try {
      const userId = req.session.currentUser._id;
      const user = userId;
      const pets = await Pet.find({});
      return res.render('home.hbs', { pets, user, isLogged });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;