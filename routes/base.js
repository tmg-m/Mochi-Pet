const express = require('express');
const Pet = require('../models/pet');
const User = require('../models/user');
const Favorite = require('../models/favorite');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const isLogged = req.session.currentUser;
    const { category, gender } = req.query;
    const query = {};

    if (!isLogged) {
      return res.render('index');
    }

    if (category) {
      query.petCategory = category;
    }
    if (gender) {
      query.petGender = gender;
    }
    try {
      const user = req.session.currentUser; //
      const userInfo = await User.findById(user);
      const pets = await Pet.find(query);

      const favPets = await Favorite.find({ user: user._id }, { pet: 1, _id: 0 });
      const favPetsId = favPets.map(fav => fav.pet.toString());
      const matchPet = pets.map(pet => {
        if (favPetsId.includes(pet._id.toString())) {
          return {
            _id: pet._id,
            petOwner: pet.petOwner,
            petCategory: pet.petCategory,
            petGender: pet.petGender,
            petName: pet.petName,
            petAge: pet.petAge,
            petColor: pet.petColor,
            address: pet.adress,
            city: pet.city,
            imageUrl: pet.imageUrl,
            isFavorite: true,
          };
        }
        return {
          _id: pet._id,
          petOwner: pet.petOwner,
          petCategory: pet.petCategory,
          petGender: pet.petGender,
          petName: pet.petName,
          petAge: pet.petAge,
          petColor: pet.petColor,
          address: pet.adress,
          city: pet.city,
          imageUrl: pet.imageUrl,
          isFavorite: false,
        };
      });

      return res.render('home.hbs', { isLogged, user, userInfo, query, pets: matchPet });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
