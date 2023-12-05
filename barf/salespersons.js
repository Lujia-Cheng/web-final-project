const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salespersonsSchema = new mongoose.Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  job_title: { type: String, required: true },
  salary: { type: Number, required: true },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

module.exports = mongoose.model("Salespersons", salespersonsSchema);