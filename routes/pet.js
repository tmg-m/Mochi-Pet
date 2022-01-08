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
    const { petName, petType, petGender, petColor } = req.body;
    const petOwner = req.session.currentUser;

    console.log('creating pet');
    try {

      await Pet.create({
        petOwner,
        petName,
        petType,
        petGender,
        petColor,
      });
      
      res.render('pet-create', { errorMessage: 'Pet created !' });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = petRoutes;
