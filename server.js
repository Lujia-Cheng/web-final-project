// init project
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// todo API routes here
// app.use('/api', apiRoutes);

// All other GET requests not handled before will return React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = app;