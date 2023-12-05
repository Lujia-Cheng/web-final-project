const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const regionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manager: String
});

module.exports = mongoose.model("Region", regionSchema);