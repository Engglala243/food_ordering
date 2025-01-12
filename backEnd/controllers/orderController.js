const { insertRecord, customRecord } = require("../utils/sqlFunctions");
const { customResponse, APIData } = require("../utils/customResponse");

const fetchOrder = async (req, res) => {
  // initializing user_id from our JWT decoded token
  const user_id = req.user.user_id;

  // then fetching the order data by user_id
  try {
    let query = `SELECT
                    o.restaurant_id,
                    o.status,
                    o.table_no,
                    o.user_id,
                    o.amount_paid,
                    r.restaurant_name,
                    o.created_at,
                    o.dish_data
                  FROM
                    orders o
                  JOIN
                    restaurants r ON r.restaurant_id = o.restaurant_id
                  WHERE
                    o.user_id = ?
                    `;
    const orderData = await customRecord(query, user_id);
    APIData(orderData)(req, res);
  } catch (err) {
    customResponse(`Data not fetched error: ${err}`, 500, false);
    console.log(`Data not fetched error: ${err}`);
  }
};

const insertOrder = async (req, res) => {
  // initiating user_id and cartData with req.body
  // variables values
  const { cart_data, amount_paid } = req.body;
  const restaurant_id = req.body.cart_data[0].restaurant_id;
  const table_no = 2;

  // extracting the dishes data only from
  // the cartData
  const dish_data = cart_data.map((data) => {
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
    user_id: req.user.user_id,
    restaurant_id,
    dish_data: JSON.stringify(dish_data),
    amount_paid,
    table_no,
    created_by: req.user.user_id,
  };

  console.log(orderEntry, "<===orderEntry");

  try {
    await insertRecord("orders", orderEntry);
    await customRecord(`DELETE FROM cart WHERE user_id = ?`, req.user.user_id);
    customResponse("Order successful!", 200, true)(req, res);
  } catch (err) {
    customResponse(`Error in inserting order: ${err}`, 500, false)(req, res);
    console.log(`Error in inserting order: ${err}`);
  }
};

module.exports = { insertOrder, fetchOrder };
