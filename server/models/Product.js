const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productAmount: {
    type: Number,
    required: true,
  },
  amountUnit: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;