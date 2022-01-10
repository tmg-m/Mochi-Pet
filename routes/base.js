const express = require('express');
const { isLoggedIn } = require('../middlewares');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      //if user is logged in ,line 10-12
      if (req.session.currentUser) {
        return res.render('home.hbs');
      }
      res.render('index.hbs', { name: 'myApp' });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
