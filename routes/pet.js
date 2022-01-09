const express = require('express');
const session = require('express-session');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');

function petRoutes() {
  const router = express.Router();

  router.get('/pet-create', (req, res, next) => {
    return res.render('pet-create.hbs');
  });

  router.post('/pet-create', async (req, res, next) => {
    const { petCategory, petGender, petName, petAge, petColor, address, city } = req.body;
    const petOwner = req.session.currentUser;

    console.log('creating pet');
    try {
      await Pet.create({
        petOwner,
        petCategory,
        petGender,
        petName,
        petAge,
        petColor,
        address,
        city,
      });

      res.render('pet-create', { errorMessage: 'Pet created !' });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = petRoutes;
