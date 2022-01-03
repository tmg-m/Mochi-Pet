const express = require('express');
const { isLoggedIn } = require('../middlewares');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      //if user is logged in ,line 10-12
      if (req.session.currentUser) {
        return res.redirect('/home');
      }

      res.render('index.hbs', { name: 'myApp' });
    } catch (e) {
      next(e);
    }
  });

  router.get('/home', async (req, res, next) => {
    try {
      //if user is logged in ,line 22-25
      if (req.session.currentUser) {
        return res.render('home.hbs');
      } else {
        return res.redirect('/');
      }
    } catch (e) {
      next(e);
    }
  });

  router.get('/pet-create', (req, res, next) => {
    return res.render('pet-create.hbs');
  });

  return router;
}

module.exports = baseRoutes;
