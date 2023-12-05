const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' },
  salespersons_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Salespersons' },
  count: Number,
  create_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transactions", transactionsSchema);