const { insertRecord, customRecord } = require("../utils/sqlFunctions");
const { customResponse } = require("../utils/customResponse");

const insertOrder = async (req, res) => {
  // initiating user_id and cartData with req.body
  // variables values
  const user_id = req.body.user_id;
  const restaurant_id = req.body.cart_data[0].restaurant_id;
  const cartData = req.body.cart_data;
  const table_no = 2;

  // extracting the dishes data only from
  // the cartData
  const dish_data = cartData.map((data) => {
    return {
      dish_id: data.dish_id,
      dish_name: data.dish_name,
      dish_description: data.dish_description,
      dish_price: data.dish_price,
      dish_image: data.dish_image,
      quantity: data.quantity,
    };
  });

  console.log(dish_data, "<===dish_data");

  // combining the dishes_data and rest values
  // for order entry for the database
  const orderEntry = {
    user_id,
    restaurant_id,
    dish_data: JSON.stringify(dish_data),
    table_no,
  };

  console.log(orderEntry, "<===orderEntry");

  try {
    await insertRecord("orders", orderEntry);
    await customRecord(`DELETE FROM cart WHERE user_id = ?`, user_id);
    customResponse("Order successful!", 200, true)(req, res);
  } catch (err) {
    customResponse(`Error in inserting order: ${err}`, 500, false)(req, res);
    console.log(`Error in inserting order: ${err}`);
  }
};

module.exports = { insertOrder };
