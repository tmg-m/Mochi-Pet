const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');

function baseRoutes() {
  const router = express.Router();
  router.get('/', async (req, res, next) => {

    const isLogged = req.session.currentUser;
    try {
      userId = req.session.currentUser._id;
      const user = userId;
      //if user is logged in ,line 10-12
      if (isLogged) {
        const pets = await Pet.find({});
        return res.render('home.hbs', { pets, user });
      }
      res.render('index.hbs', { name: 'myApp' });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
