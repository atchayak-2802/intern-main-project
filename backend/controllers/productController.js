const Product = require("../models/Product");


// GET PRODUCTS
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ADD PRODUCT
const addProduct = async (req, res) => {

  try {

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// LOW STOCK
const lowStock = async (req, res) => {

  try {

    const products = await Product.find({
      quantity: { $lte: 5 },
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// NEAR EXPIRY
const nearExpiry = async (req, res) => {

  try {

    const today = new Date();

    const next3Days = new Date();

    next3Days.setDate(today.getDate() + 3);

    const products = await Product.find({

      expiryDate: {
        $gte: today,
        $lte: next3Days,
      },

    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {

  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  lowStock,
  nearExpiry,

};

