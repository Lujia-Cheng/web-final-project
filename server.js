// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
app.use(express.json());

// load my .json files
const songs = require('./songs.json');
const artists = require('./artists.json');

// Routes for songs
app.get('/songs', function(request, response) {
  response.json(songs);
});

app.get('/songs/:title', function(request, response) {
  let title = request.params['title'];
  if (songs[title]) {
    response.json(songs[title]);
  } else {
    response.status(404).json({ message: "Song not found" });
  }
});

app.post('/songs', function(request, response) {
  // Extract song details from request body
  let newSong = request.body;
  // Add a unique identifier or title for the new song
  songs[newSong.title] = newSong;
  response.status(201).json({ message: "Song added successfully", song: newSong });
});

app.put('/songs/:title', function(request, response) {
  let title = request.params['title'];
  if (songs[title]) {
    // Update song details
    songs[title] = request.body;
    response.json({ message: "Song updated successfully", song: songs[title] });
  } else {
    response.status(404).json({ message: "Song not found" });
  }
});

app.delete('/songs/:title', function(request, response) {
  let title = request.params['title'];
  if (songs[title]) {
    delete songs[title];
    response.json({ message: "Song deleted successfully" });
  } else {
    response.status(404).json({ message: "Song not found" });
  }
});



// Routes for artists
app.get('/artists', function(request, response) {
  response.json(artists);
});
app.get('/artists/:name', function(request, response) {
  let name = request.params['name'];
  if (artists[name]) {
    response.json(artists[name]);
  } else {
    response.status(404).json({ message: "Artist not found" });
  }
});
app.post('/artists', function(request, response) {
  // Extract artist details from request body
  let newArtist = request.body;

  // Add a unique identifier or name for the new artist
  artists[newArtist.name] = newArtist;

  response.status(201).json({ message: "Artist added successfully", artist: newArtist });
});
app.put('/artists/:name', function(request, response) {
  let name = request.params['name'];
  if (artists[name]) {
    // Update artist details
    artists[name] = request.body;
    response.json({ message: "Artist updated successfully", artist: artists[name] });
  } else {
    response.status(404).json({ message: "Artist not found" });
  }
});
app.delete('/artists/:name', function(request, response) {
  let name = request.params['name'];
  if (artists[name]) {
    delete artists[name];
    response.json({ message: "Artist deleted successfully" });
  } else {
    response.status(404).json({ message: "Artist not found" });
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
