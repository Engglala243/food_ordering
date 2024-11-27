const mysql = require("mysql2/promise");
const config = require("../config");
const cartSchema = require("./cartSchema");

const db = mysql.createPool(config);


const addItemToCart = async (req, res) => {
  const { cart_id, user_id, product_id } = req.body;

  try {
    await db.query(cartSchema.addCartItem, [
      cart_id,
      user_id,
      product_id
    ]);

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getCartItems = async (req, res) => {
  const { cart_id } = req.params;

  try {
    const [items] = await db.query(cartSchema.getCartItems, [cart_id]);

    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: items,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const removeCartItems = async (req, res) => {
  const { cart_id } = req.body;

  try {
    await db.query(cartSchema.removeCartItems, [cart_id]);

    res.status(200).json({
      success: true,
      message: "Cart items removed successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  addItemToCart,
  getCartItems,
  removeCartItems,
};
