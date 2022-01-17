const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
});

favoriteSchema.index({ user: 1, pet: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
