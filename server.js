// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  console.log(process.env.FIRSTNAME)
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/sup', function(request, response) {
  response.render("sup", {
    message: "Hey everyone! This is my webpage.",
    
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
