const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/", require("./itemRoutes"));
router.use("/payment", require("./paymentRoutes"));
router.use("/", require("./menuRoutes"));
router.use("/dishes", require("./dishRoutes"));

module.exports = router;
