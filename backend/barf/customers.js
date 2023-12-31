// barf/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customersSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  kind: { type: String },
  business_category: String,
  annual_income: String,
  marriage_status: String,
  gender: String,
  age: Number,
  income: Number,
  create_at: { type: Date, default: Date.now },
  is_admin: { type: Boolean, required: true },
});

module.exports = mongoose.model("Customers", customersSchema);
