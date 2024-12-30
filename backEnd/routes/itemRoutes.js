const express = require("express");
const { fetchResturants } = require("../controllers/itemController.js");
const {
  fetchCart,
  insertCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartControllers.js");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken.js");
const {
  insertOrder,
  fetchOrder,
} = require("../controllers/orderController.js");

// menu data route
router.get("/menu/data", fetchResturants);

// cart routes
router.get("/cart/:user_id", fetchCart);
router.post("/cart/insert", verifyToken, insertCart);
router.post("/cart/update", verifyToken, updateCart);
router.post("/cart/delete", verifyToken, deleteCart);

// order routes
router.post("/order/insert", verifyToken, insertOrder);
router.get("/order/", verifyToken, fetchOrder);

module.exports = router;
