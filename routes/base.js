const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const { category, gender } = req.query;

    const query = {};

    if (category) {
      query.petCategory = category;
    }
    if (gender) {
      query.petGender = gender;
    }

    try {
      // if user is logged in ,line 10-12
      const isLogged = req.session.currentUser;

      const pets = await Pet.find(query);

      return res.render('home.hbs', { pets, isLogged, query });
      // res.render('index.hbs', { name: 'myApp' }); // TODO solo puede haber un render
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
