const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({

  productName: String,

  brand: String,

  quantitySold: Number,

  totalAmount: Number,

  profit: Number,

  soldItems: [
    {
      batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: Number,

      buyingPrice: Number,

      sellingPrice: Number,

      subtotal: Number,

      profit: Number,
    }
  ],

  soldDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Sale",
  saleSchema
);