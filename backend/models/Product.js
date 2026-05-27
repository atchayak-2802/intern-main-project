const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  buyingPrice: {
    type: Number,
    required: true,
  },

  sellingPrice: {
    type: Number,
    required: true,
  },

  expiryDate: {
    type: Date,
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);

