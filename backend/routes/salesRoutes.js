const express = require("express");

const router = express.Router();

const {

  sellProduct,

  getSales,

  brandAnalytics,
  getTodaySummary

} = require(
  "../controllers/salesController"
);


router.post("/sell", sellProduct);

router.get("/", getSales);

router.get(
  "/analytics",
  brandAnalytics
);
router.get("/summary/today", getTodaySummary);

module.exports = router;