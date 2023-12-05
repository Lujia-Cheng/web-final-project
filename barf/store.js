const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  manager: { type: String, required: true },
  salesperson_number: Number,
  region_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' }
});

module.exports = mongoose.model("Store", storeSchema);