const express = require('express');

function authRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      res.render('authentication/signUp.hbs');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = authRoutes;
