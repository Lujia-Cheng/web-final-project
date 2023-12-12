// barf/transactions.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' },
  count: Number,
  create_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transactions", transactionsSchema);