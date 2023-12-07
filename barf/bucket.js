// barf/bucket.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bucketSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  create_at: { type: Date, default: Date.now },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' }
});

module.exports = mongoose.model("Bucket", bucketSchema);