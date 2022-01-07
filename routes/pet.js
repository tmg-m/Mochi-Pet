const express = require('express');
const { isLoggedIn } = require('../middlewares');

function petRoutes() {
  const router = express.Router();

  router.get('/pet-create', (req, res, next) => {
    return res.render('pet-create.hbs');
  });

  router.post('/pet-create', async (req, res, next) => {
    const { petName, petType, petGender, petColor } = req.body;

    try {

        

    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = petRoutes;
