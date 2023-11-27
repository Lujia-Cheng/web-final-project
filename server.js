// server.js
// init project
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Import Mongoose models
const Artist = require('./models/artist');
const Song = require('./models/song');

// Establish a connection with the Mongo Database
// (Ensure that the .env file is set up with USERNAME, PASSWORD, HOST, and DATABASE)
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes for songs
app.get('/songs', async (request, response) => {
  try {
    const songs = await Song.find({});
    response.json(songs);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.get('/songs/:title', async (request, response) => {
  try {
    const song = await Song.findOne({ title: request.params.title });
    if (!song) {
      return response.status(404).json({ message: "Song not found" });
    }
    response.json(song);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.post('/songs', async (request, response) => {
  const newSong = new Song(request.body);
  try {
    await newSong.save();
    response.status(201).json({ message: "Song added successfully", song: newSong });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.put('/songs/:title', async (request, response) => {
  try {
    const updatedSong = await Song.findOneAndUpdate({ title: request.params.title }, request.body, { new: true });
    if (!updatedSong) {
      return response.status(404).json({ message: "Song not found" });
    }
    response.json({ message: "Song updated successfully", song: updatedSong });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.delete('/songs/:title', async (request, response) => {
  try {
    const song = await Song.findOneAndDelete({ title: request.params.title });
    if (!song) {
      return response.status(404).json({ message: "Song not found" });
    }
    response.json({ message: "Song deleted successfully" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});


// Routes for artists
app.get('/artists', async (request, response) => {
  try {
    const artists = await Artist.find({});
    response.json(artists);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.get('/artists/:name', async (request, response) => {
  try {
    const artist = await Artist.findOne({ name: request.params.name });
    if (!artist) {
      return response.status(404).json({ message: "Artist not found" });
    }
    response.json(artist);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.post('/artists', async (request, response) => {
  const newArtist = new Artist(request.body);
  try {
    await newArtist.save();
    response.status(201).json({ message: "Artist added successfully", artist: newArtist });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.put('/artists/:name', async (request, response) => {
  try {
    const updatedArtist = await Artist.findOneAndUpdate({ name: request.params.name }, request.body, { new: true });
    if (!updatedArtist) {
      return response.status(404).json({ message: "Artist not found" });
    }
    response.json({ message: "Artist updated successfully", artist: updatedArtist });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.delete('/artists/:name', async (request, response) => {
  try {
    const artist = await Artist.findOneAndDelete({ name: request.params.name });
    if (!artist) {
      return response.status(404).json({ message: "Artist not found" });
    }
    response.json({ message: "Artist deleted successfully" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

app.get('/artists/:name/songs', async (request, response) => {
  try {
    const artistSongs = await Song.find({ artist: request.params.name });
    if (artistSongs.length === 0) {
      return response.status(404).json({ message: "No songs found for this artist" });
    }
    response.json(artistSongs);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});


// Handle 404 for undefined routes
app.use(function(request, response) {
  response.status(404).json({ message: "Resource not found" });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});