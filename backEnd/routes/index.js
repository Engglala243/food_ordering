const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/item", require("./itemRoutes")); 
// router.use("/cart", require("./cartRoutes")); 

module.exports = router;
