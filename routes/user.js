const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');
const User = require('../models/user');

function userRoutes() {
  const router = express.Router();

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id).populate('userPets');
      res.render('user/profile.hbs', { user });
    } catch (e) {
      next(e);
    }
  });

  router.get('/mylist', (req, res, next) => {
    return res.render('user/mylist.hbs');
  });

  router.get('/:id/userEdit', async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      res.render('user/userEdit.hbs', { user });
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/userEdit', async (req, res, next) => {
    const { id } = req.params;
    const { username, name, email } = req.body;

    try {
      console.log('editing');
      await User.findByIdAndUpdate(id, {
        username,
        name,
        email,
      });
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  // delete user
  router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      await User.findByIdAndDelete(id);
      req.session.destroy(err => {
        next(err)
      });
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  // logout
  router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  });

  return router;
}

module.exports = userRoutes;