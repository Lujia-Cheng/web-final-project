// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const dictionary = require('./dictionary.json');

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

app.get('/dict/:word', getWord);

function getWord(request, response){
  const routeParams = request.params;
  const word = routeParams.word;
  
  const key = word.toLowerCase();
  const definition = dictionary[key];
  if(definition === undefined)
    response.send(`The word ${word} is not in the English dictionary.`);
 // response.send(`The definition of ${word} is ${definition}`);
  response.render("word", {word: word})
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
