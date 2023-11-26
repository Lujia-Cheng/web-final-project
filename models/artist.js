// models/artist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  debutYear: { type: Number }
});

module.exports = mongoose.model('Artist', ArtistSchema);
