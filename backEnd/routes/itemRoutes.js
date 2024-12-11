const express = require("express");
const { fetchResturants } = require("../controllers/itemController.js");
const { fetchCart, insertCart } = require("../controllers/shopControllers.js");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken.js");

router.get("/data", fetchResturants);
router.get("/cart-data", verifyToken, fetchCart);
router.post("/cart", verifyToken, insertCart);

module.exports = router;
