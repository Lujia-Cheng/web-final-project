// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

//load my .json file of english dictionary word
const dictionary = require('./dictionary.json');




//define your routes here. don't forget about error handling
app.get('/', function(request, response) {
  response.json({
    message: "Please see the README.md for documentation",
  })
});

app.get('/dictionary', function(request, response) {
  response.json(dictionary)
});

app.get('/dictionary/:word', function(request, response){
  let word = request.params['word'];
  let result = {"word":word,
                  "definition":dictionary[word]};
  
  response.json(result)
});





// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
