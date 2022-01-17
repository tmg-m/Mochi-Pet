const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');

function petRoutes() {
  const router = express.Router();

  // Read
  router.get('/search', (req, res, next) => {
    const user = req.session.currentUser._id;
    const animals = ['Dog', 'Cat', 'Hamster', 'Fish', 'Bird', 'Other'];
    res.render('search.hbs', { animals, user });
  });

  router.post('/search', async (req, res, next) => {
    const { petCategory } = req.body;

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

  router.post('/pet-create', async (req, res, next) => {
    const { petCategory, petGender, petName, petAge, petColor, address, city } = req.body;
    const petOwner = req.session.currentUser;

    console.log(petOwner);
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
      });
      await User.findByIdAndUpdate({ _id: petOwner._id }, { $push: { userPets: newPet } });
      console.log('pet created');
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    const { id } = req.params;
    try {
      const pet = await Pet.findById(id);
      const { petOwner } = pet;
      res.render('petDetail.hbs', { pet, isOwner: _id === petOwner.toString() });
    } catch (err) {
      next(err);
    }
  });

  // edit pet
  router.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
      const pet = await Pet.findById(id);
      console.log('id found');
      res.render('petEdit.hbs', { pet });
      console.log('ggwp');
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const { petCategory, petGender, petName, petAge, petColor, address, city } = req.body;

    try {
      console.log('editing');
      await Pet.findByIdAndUpdate(id, {
        petCategory,
        petGender,
        petName,
        petColor,
        petAge,
        address,
        city,
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

  return router;
}

module.exports = petRoutes;
