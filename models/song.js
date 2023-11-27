// models/song.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number }
});

module.exports = mongoose.model('Song', SongSchema);
