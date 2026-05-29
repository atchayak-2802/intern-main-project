
const Product = require("../models/Product");
const Sale = require("../models/Sale");


// SELL PRODUCT
const sellProduct = async (req, res) => {
  try {
    const { productName, brand, quantitySold } = req.body;

    let remainingQty = Number(quantitySold);

    // GET BATCHES (FIFO / FEFO)
    const batches = await Product.find({
      productName,
      brand,
      quantity: { $gt: 0 },
    }).sort({ expiryDate: 1 });

    if (batches.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    const totalStock = batches.reduce(
      (sum, b) => sum + b.quantity,
      0
    );

    if (totalStock < remainingQty) {
      return res.status(400).json({
        message: `Only ${totalStock} items available`,
      });
    }

    let totalAmount = 0;
    let totalProfit = 0;

    const soldItems = [];

    // FEFO LOOP
    for (const batch of batches) {
      if (remainingQty <= 0) break;

      const qty = Math.min(
        remainingQty,
        batch.quantity
      );

      // UPDATE STOCK
      batch.quantity -= qty;
      await batch.save();

      // CALCULATIONS (PER BATCH)
      const subtotal =
        qty * batch.sellingPrice;

      const profit =
        qty *
        (batch.sellingPrice -
          batch.buyingPrice);

      totalAmount += subtotal;
      totalProfit += profit;

      soldItems.push({
        batchId: batch._id,
        quantity: qty,
        buyingPrice: batch.buyingPrice,
        sellingPrice: batch.sellingPrice,
        subtotal,
        profit,
      });

      remainingQty -= qty;
    }

    // SAVE SALE
    const sale = new Sale({
      productName,
      brand,
      quantitySold: Number(quantitySold),
      totalAmount,
      profit: totalProfit,
      soldItems,
    });

    await sale.save();

    res.json({
      message: "Sale Completed",
      sale,
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

    const sales = await Sale.find();

    const productMap = {};

    sales.forEach((item) => {

      const key =
        `${item.productName}-${item.brand}`;

      if (!productMap[key]) {

        productMap[key] = {
          productName: item.productName,
          brand: item.brand,
          sold: Number(item.quantitySold),
        };

      } else {

        productMap[key].sold +=
          Number(item.quantitySold);

      }
    });

    const topBrands = {};

    Object.values(productMap).forEach((item) => {

      const product = item.productName;

      if (
        !topBrands[product] ||
        item.sold > topBrands[product].sold
      ) {

        topBrands[product] = item;

      }
    });

    const analytics =
      Object.values(topBrands).map((item) => ({
        name:
          `${item.productName} - ${item.brand}`,
        value: item.sold,
      }));

    res.json(analytics);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// TODAY SUMMARY
const getTodaySummary = async (req, res) => {
  try {

    const start = new Date();

    start.setHours(0, 0, 0, 0);

    const end = new Date();

    end.setHours(23, 59, 59, 999);

    const sales = await Sale.find({
      soldDate: {
        $gte: start,
        $lte: end,
      },
    });

    let totalProfit = 0;

    let highestProfitProduct = null;

    sales.forEach((item) => {

      totalProfit += item.profit;

      if (
        !highestProfitProduct ||
        item.profit >
          highestProfitProduct.profit
      ) {

        highestProfitProduct = item;

      }
    });

    // EXPIRED PRODUCTS
    const expiredProducts = await Product.find({
      expiryDate: { $lt: new Date() },
    });

    let expiryLoss = 0;

    expiredProducts.forEach((p) => {

      expiryLoss +=
        p.buyingPrice * p.quantity;

    });

    res.json({
      totalSales: sales.length,

      totalProfit,

      highestProfitProduct,

      expiryLoss,

      netProfit:
        totalProfit - expiryLoss,
    });

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
  getTodaySummary,
};

