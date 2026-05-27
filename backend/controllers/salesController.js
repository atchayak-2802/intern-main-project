const Product = require("../models/Product");

const Sale = require("../models/Sale");


// SELL PRODUCT
const sellProduct = async (req, res) => {

  try {

    const {
      productName,
      brand,
      quantitySold,
    } = req.body;


    const product = await Product.findOne({
      productName,
      brand,
    });


    if (!product) {

      return res.status(404).json({
        message: "Product Not Found",
      });

    }


    if (
      product.quantity <
      Number(quantitySold)
    ) {

      return res.status(400).json({
        message: "Insufficient Stock",
      });

    }


    // UPDATE QUANTITY
    product.quantity =
      product.quantity -
      Number(quantitySold);

    await product.save();


    // PROFIT
    const profit =
      (
        Number(product.sellingPrice) -
        Number(product.buyingPrice)
      ) *
      Number(quantitySold);


    // SALE ENTRY
    const sale = new Sale({

      productName,

      brand,

      quantitySold:
        Number(quantitySold),

      totalAmount:
        Number(product.sellingPrice) *
        Number(quantitySold),

      profit,

    });


    await sale.save();

    res.json({
      message: "Sale Completed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SALES
const getSales = async (req, res) => {

  try {

    const sales = await Sale.find();

    res.json(sales);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// BRAND ANALYTICS
const brandAnalytics = async (req, res) => {

  try {

    const analytics =
      await Sale.aggregate([

        {
          $group: {

            _id: "$brand",

            totalSold: {
              $sum: "$quantitySold",
            },

          },
        },

      ]);

    res.json(analytics);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {

  sellProduct,
  getSales,
  brandAnalytics,

};
