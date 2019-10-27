// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const dictionary = require('./dictionary.json');


//use the static files in the public folder
app.use(express.static('public'));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");



//define your routes here. don't forget about error handling
app.get('/', function(request, response) {
  response.render("index", {
    message: "Hey everyone! This is my webpage.",
  });
});








//use this method to retrieve a word from the dictionary
function getDefinition(request, response){
  const routeParams = request.params;
  const word = routeParams.word;
  
  //all of our keys are lowercase
  const key = word.toLowerCase();
  const definition = dictionary[key];
  
  //handle error case: word does not exist in dictionary
  
  //if the word exists, return it in the response
  
}



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
