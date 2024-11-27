const express = require("express");
const {
    addItemToCart,
    getCartItems,
    removeCartItems,
} = require("../controllers/cartControllers");

const router = express.Router();

router.post("/add-item", addItemToCart);
router.get("/:cart_id", getCartItems);
router.post("/remove-items", removeCartItems);

module.exports = router;
