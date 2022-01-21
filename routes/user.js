const express = require('express');
const { isLoggedIn } = require('../middlewares');
const Pet = require('../models/pet');
const User = require('../models/user');
const fileUploader = require('../config/cloudinary.config');

function userRoutes() {
  const router = express.Router();

  router.get('/:id', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    const user = req.session.currentUser._id;
    try {
      const userObject = await User.findById(_id).populate('userPets');
      res.render('user/profile.hbs', { userObject, user });
    } catch (e) {
      next(e);
    }
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

  router.post('/:id/userEdit', fileUploader.single('petProfile-Image'), async (req, res, next) => {
    const { id } = req.params;
    const { username, name, email, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    try {
      console.log('editing');
      await User.findByIdAndUpdate(id, {
        username,
        name,
        email,
        imageUrl,
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
        next(err);
      });
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  router.get('/:id/mylist', (req, res, next) => {
    const user = req.session.currentUser._id;
    return res.render('user/mylist.hbs', { user });
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
