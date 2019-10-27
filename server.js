// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

//use the static files in the public folder
app.use(express.static('public'));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");



//define our routes
app.get('/', function(request, response) {
  response.render("index", {
    message: "Hey everyone! This is my webpage.",
  });
});

app.get('/sup/:name', function(request, response){
  response.render("sup", {name: request.params.name});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
