const {
  insertRecord,
  checkRecordExists,
  createTable,
  selectRecord,
} = require("../utils/sqlFunctions");
const { cartSchema } = require("../schema/itemSchema");
const { APIData, customResponse } = require("../utils/customResponse");

const fetchCart = async (req, res, next) => {
  const cartData = await selectRecord("cart");
  APIData(cartData)(req, res);
};

const insertCart = async (req, res, next) => {
  const { user_id, dish_id, quantity } = req.body;

  const cartData = {
    user_id,
    dish_id,
    quantity,
  };

  try {
    await createTable(cartSchema);
    const existingDish = await checkRecordExists("cart", "dish_id", dish_id);

    if (existingDish) {
      customResponse("Dish already exists", 409, false)(req, res);
    } else {
      await insertRecord("cart", cartData);
      customResponse("Data Inserted successfully", 201, true)(req, res);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchCart,
  insertCart,
};
