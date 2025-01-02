const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/", require("./itemRoutes"));
router.use("/payment", require("./paymentRoutes"));

module.exports = router;
