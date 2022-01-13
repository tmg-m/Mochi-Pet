const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {

    const isLogged = req.session.currentUser;
    try {
      //if user is logged in ,line 10-12
      if (isLogged) {
        console.log('find');
        const pets = await Pet.find({});
        console.log('pet found');
        return res.render('home.hbs', { pets });
      }
      res.render('index.hbs', { name: 'myApp' });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
