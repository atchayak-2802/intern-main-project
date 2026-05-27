const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  lowStock,
  nearExpiry,
} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/", addProduct);

// ALERT ROUTES
router.get("/alerts/lowstock", lowStock);

router.get("/alerts/expiry", nearExpiry);

// ID ROUTES
router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

module.exports = router;

