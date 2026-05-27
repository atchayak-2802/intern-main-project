const express = require("express");

const router = express.Router();

const {

  sellProduct,

  getSales,

  brandAnalytics,

} = require(
  "../controllers/salesController"
);


router.post("/sell", sellProduct);

router.get("/", getSales);

router.get(
  "/analytics",
  brandAnalytics
);

module.exports = router;