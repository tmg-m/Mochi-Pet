const express = require('express');
const Pet = require('../models/pet');

function baseRoutes() {
  const router = express.Router();
  /* router.get('/', async (req, res, next) => {
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
  }); */

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
      const user = req.session.currentUser._id;
      const isLogged = req.session.currentUser;
      const pets = await Pet.find(query);
      return res.render('home.hbs', { pets, isLogged, user, query });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
