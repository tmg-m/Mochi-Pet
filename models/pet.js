const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  category : [ "dog", "cat", "others"],
  gender : ["male", "female"],
  name : String,
  age : Number,
  race : String, //array de razas?
  colour : String, //array de colores?
  location : ["Ciutat Vella", "Eixample", "Sants", "Les Corts", "Sarrià-SantGervasi", "Gràcia", "Horta-Guinardó", "Nou Barris", "Sant Andreu", "Sant Martí" ]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;