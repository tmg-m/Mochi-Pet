const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');
const Favorite = require('../models/favorite');
const fileUploader = require('../config/cloudinary.config');

function petRoutes() {
  const router = express.Router();

  router.get('/search', (req, res, next) => {
    const user = req.session.currentUser._id;
    const animals = ['Dog', 'Cat', 'Hamster', 'Fish', 'Bird', 'Other'];
    res.render('search.hbs', { animals, user });
  });

  router.post('/search', async (req, res, next) => {
    const { petCategory, petGender } = req.body;
    try {
      const user = req.session.currentUser._id;
      const searched = await Pet.find();
      const eachPet = [];
      console.log(searched);
      for (let i = 0; i < searched.length; i++) {
        if (petCategory === searched[i].petCategory) {
          console.log(`eachPet ${eachPet}`);
          eachPet.push(searched[i]);
        }
      }
      res.render('home.hbs', { eachPet, user });
    } catch (err) {
      next(err);
    }
  });

  // create
  router.get('/pet-create', (req, res, next) => {
    const user = req.session.currentUser._id;
    return res.render('pet-create.hbs', { user });
  });

  router.post('/pet-create', fileUploader.single('petProfile-Image'), async (req, res, next) => {
    const { petCategory, petGender, petName, petAge, petColor, address, city, existingImage } = req.body;
    const petOwner = req.session.currentUser;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
    console.log('creating');
    try {
      const newPet = await Pet.create({
        petOwner,
        petCategory,
        petGender,
        petName,
        petAge,
        petColor,
        address,
        city,
        imageUrl,
      });
      await User.findByIdAndUpdate({ _id: petOwner._id }, { $push: { userPets: newPet } });
      console.log('pet created');
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const user = req.session.currentUser._id;
    const { _id } = req.session.currentUser;
    const { id } = req.params;
    try {
      const pet = await Pet.findById(id);
      const { petOwner } = pet;
      res.render('petDetail.hbs', { pet, user, isOwner: _id === petOwner.toString() });
    } catch (err) {
      next(err);
    }
  });

  // edit pet
  router.get('/:id/edit', async (req, res, next) => {
    const user = req.session.currentUser._id;
    const { id } = req.params;
    try {
      const pet = await Pet.findById(id);
      console.log(pet);
      res.render('petEdit.hbs', { pet, user });
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/edit', fileUploader.single('petProfile-Image'), async (req, res, next) => {
    const { id } = req.params;
    console.log('ok');
    const { petCategory, petGender, petName, petAge, petColor, address, city, existingImage } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    try {
      await Pet.findByIdAndUpdate(id, {
        petCategory,
        petGender,
        petName,
        petColor,
        petAge,
        address,
        city,
        imageUrl,
      });
      console.log('done');
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  // delete pet
  router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      await Pet.findByIdAndDelete(id);
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  // favorites

  router.post('/:id/favorite', async (req, res, next) => {
    const { id: petId } = req.params;
    const { _id: userId } = req.session.currentUser;
    try {
      console.log('not yet');
      await Favorite.create({
        user: userId,
        pet: petId,
      });
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  router.post('/:id/unfavorite', async (req, res, next) => {
    const { id: petId } = req.params;
    try {
      console.log('not yet');
      await Favorite.findByIdAndDelete({
        pet: petId,
      });
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = petRoutes;
