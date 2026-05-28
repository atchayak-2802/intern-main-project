const Product = require("../models/Product");
const Sale = require("../models/Sale");

// SELL PRODUCT
const sellProduct = async (req, res) => {
  try {
    const { productName, brand, quantitySold } = req.body;

    const product = await Product.findOne({ productName, brand });

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    if (product.quantity < Number(quantitySold)) {
      return res.status(400).json({ message: "Insufficient Stock" });
    }

    product.quantity -= Number(quantitySold);
    await product.save();

    const profit =
      (Number(product.sellingPrice) - Number(product.buyingPrice)) *
      Number(quantitySold);

    const sale = new Sale({
      productName,
      brand,
      quantitySold: Number(quantitySold),
      totalAmount: Number(product.sellingPrice) * Number(quantitySold),
      profit,
    });

    await sale.save();

    res.json({ message: "Sale Completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SALES
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BRAND ANALYTICS
const brandAnalytics = async (req, res) => {
  try {
    const sales = await Sale.find();

    const productMap = {};

    sales.forEach((item) => {
      const key = `${item.productName}-${item.brand}`;

      if (!productMap[key]) {
        productMap[key] = {
          productName: item.productName,
          brand: item.brand,
          sold: Number(item.quantitySold),
        };
      } else {
        productMap[key].sold += Number(item.quantitySold);
      }
    });

    const topBrands = {};

    Object.values(productMap).forEach((item) => {
      const product = item.productName;

      if (!topBrands[product] || item.sold > topBrands[product].sold) {
        topBrands[product] = item;
      }
    });

    const analytics = Object.values(topBrands).map((item) => ({
      name: `${item.productName} - ${item.brand}`,
      value: item.sold,
    }));

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      soldDate: { $gte: start, $lte: end },
    });

    let totalProfit = 0;
    let highestProfitProduct = null;

    sales.forEach((item) => {
      totalProfit += item.profit;

      if (
        !highestProfitProduct ||
        item.profit > highestProfitProduct.profit
      ) {
        highestProfitProduct = item;
      }
    });

    const expiredProducts = await Product.find({
      expiryDate: { $lt: new Date() },
    });

    let expiryLoss = 0;

    expiredProducts.forEach((p) => {
      expiryLoss += p.buyingPrice * p.quantity;
    });

    res.json({
      totalSales: sales.length,
      totalProfit,
      highestProfitProduct,
      expiryLoss,
      netProfit: totalProfit - expiryLoss,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sellProduct,
  getSales,
  brandAnalytics,
  getTodaySummary,
};