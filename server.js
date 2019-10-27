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

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//app.get('dict/:random', getRandomWord);

function getWord(request, response){
  const routeParams = request.params;
  const word = routeParams.word;
  
  const key = word.toLowerCase();
  const definition = dictionary[key];
  if(definition === undefined){
    response.status(400);
    response.send("Word not found");
  } else{
    response.status(200);
    response.json({"word": word, "definition": definition});
  }
  
     //response.send(`The word ${word} is not in the English dictionary.`);
  
  //response.render("word", {word: word, definition: definition})
 
}



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
