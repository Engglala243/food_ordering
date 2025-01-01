const {
  insertRecord,
  checkRecordExists,
  createTable,
  selectRecord,
  customRecord,
} = require("../utils/sqlFunctions");
const { cartSchema } = require("../schema/itemSchema");
const { APIData, customResponse } = require("../utils/customResponse");
const { APIError, AppError } = require("../utils/customErrors");
const { query } = require("express");

const fetchCart = async (req, res, next) => {
  const user_id = req.user.user_id;
  try {
    const query = `
                  SELECT 
                    c.restaurant_id,
                    c.dish_id,
                    c.quantity,
                    d.name AS dish_name,
                    d.description AS dish_description,
                    d.dish_image,
                    d.price AS dish_price
                  FROM 
                    cart c
                  JOIN 
                    dishes d ON c.dish_id = d.dish_id
                  WHERE 
                    c.user_id = ?;
                  `;
    const cartData = await customRecord(query, user_id);
    console.log(cartData, "<===Cart Data from SQL");
    APIData(cartData)(req, res);
  } catch (err) {
    next(new APIError(`${err}`, 200, false, null));
  }
};

const insertCart = async (req, res, next) => {
  const { user_id, dish_id, restaurant_id, quantity } = req.body;

  const cartEntry = {
    user_id,
    restaurant_id,
    dish_id,
    quantity,
  };

  try {
    const query = `SELECT * from cart WHERE user_id = ?`;
    const cartData = await customRecord(query, user_id);

    // checking if the user cart is empty, and if it then it'll
    // directly insert the item in the table through it else statement
    if (cartData.length > 0) {
      // checking for already existing restaurant for maintaing
      // single restaurant cart data record only, else it'll
      // delete the user_id record and then insert the data
      if (cartData[0].restaurant_id === restaurant_id) {
        let query = `SELECT * FROM cart WHERE user_id = ? AND dish_id = ?`;
        dishExists = await customRecord(query, [user_id, dish_id]);

        // if dishExists it'll increase the quantity by 1 or
        // it'll insert the record for the first time
        if (dishExists.length === 0) {
          await insertRecord("cart", cartEntry);
          customResponse(
            "Cart Data Inserted successfully",
            201,
            true,
          )(req, res);
        } else {
          if (quantity === -1) {
            query = `UPDATE cart SET quantity = CASE
                                          WHEN quantity > 1 THEN quantity + ${quantity}
                                          ELSE quantity
                                                    END
                         WHERE user_id = ? AND dish_id = ?`;
          } else {
            query = `UPDATE cart SET quantity = quantity + 1
                         WHERE user_id = ? AND dish_id = ?`;
          }

          await customRecord(query, [user_id, dish_id]);
          customResponse(
            "Dish quantity updated successfully!",
            201,
            true,
          )(req, res);
        }
      } else {
        let query = `DELETE from cart WHERE user_id = ? and dish_id = ?`;
        await customRecord(query);
        await insertRecord("cart", cartEntry);
        customResponse("Cart data inserted successfully", 201, true)(req, res);
      }
    } else {
      await insertRecord("cart", cartEntry);
      customResponse("Cart data inserted successfully", 201, true)(req, res);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCart = async (req, res, next) => {
  const { user_id, dish_id, quantity } = req.body;

  try {
    let query;

    if (quantity === -1) {
      query = `UPDATE cart SET quantity = CASE
                                          WHEN quantity > 1 THEN quantity + ${quantity}
                                          ELSE quantity
                                                    END
                         WHERE user_id = ? AND dish_id = ?`;
    } else {
      query = `UPDATE cart SET quantity = quantity + 1
                         WHERE user_id = ? AND dish_id = ?`;
    }

    await customRecord(query, [user_id, dish_id]);
    customResponse("Dish quantity updated successfully!", 201, true)(req, res);
  } catch (err) {
    next(new AppError(`Error: ${err}`, 400, false));
  }
};

const deleteCart = async (req, res, next) => {
  const { user_id, dish_id } = req.body;

  try {
    const query = `DELETE from cart WHERE user_id = ? and dish_id = ?`;
    await customRecord(query, [user_id, dish_id]);
    customResponse("Dish data remove successfully", 200, true)(req, res);
  } catch (err) {
    next(new AppError(`Error: ${err}`, 400, false));
  }
};

module.exports = {
  fetchCart,
  insertCart,
  updateCart,
  deleteCart,
};
