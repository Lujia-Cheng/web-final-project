// // Data Model for Books
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const BookSchema = new Schema(
//   {
//     title: {type: String},
//     author: {type: String},
//   }
// );

// // Export model
// module.exports = mongoose.model("book", BookSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inventory_amount: { type: Number, required: true },
  single_cost_price: { type: Number, required: true },
  single_selling_price: { type: Number, required: true },
  profit: { type: Number, default: 0 },
  selling_amount: { type: Number, default: 0 },
  kind: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
  salespersons_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Salespersons' }
});

module.exports = mongoose.model("Product", productSchema);