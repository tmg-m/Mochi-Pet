const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');

function userRoutes() {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    return res.render('user/profile.hbs');
  });

  router.get('/mylist', (req, res, next) => {
    return res.render('user/mylist.hbs');
  });

  return router;
}

module.exports = userRoutes;
