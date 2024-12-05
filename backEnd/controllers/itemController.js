const {
  customRecord,
  insertRecord,
  checkRecordExists,
  createTable,
  selectRecord,
} = require("../utils/sqlFunctions");
const { APIData, customResponse } = require("../utils/customResponse");
const { APIError } = require("../utils/customErrors");
const { cartSchema } = require("../schema/itemSchema");

const fetchResturants = async (req, res, next) => {
  const restrau_Id = req.query.id;
  try {
    const query = `SELECT 
        m.name AS menu_name,
        d.dish_id AS dish_id,
        d.name AS dish_name,
        d.description AS description,
        d.price AS price,
        d.dish_image AS dish_image,
        r.restaurant_id AS restaurant_id,
        r.restaurant_name AS restaurant_name,
        r.street AS street,
        r.city AS city,
        r.country AS country
    FROM 
        restaurants r
    JOIN 
        menu m ON r.restaurant_id = m.restaurant_id
    JOIN 
        dishes d ON m.menu_id = d.menu_id
    JOIN 
        restaurants h ON r.restaurant_id = h.restaurant_id
    WHERE 
        h.restaurant_id = ?;`;
    const itemData = await customRecord(query, [restrau_Id]);

    const restaurantInfo = itemData.reduce((acc, item) => {
      // Initialize restaurant info only once
      if (!acc.restaurant_id) {
        acc.restaurant_id = item.restaurant_id;
        acc.restaurant_name = item.restaurant_name;
        acc.restaurant_address = `${item.street}, ${item.city}, ${item.country}`;
        acc.dishes_data = {};
      }

      // Create or add to menu category
      if (!acc.dishes_data[item.menu_name]) {
        acc.dishes_data[item.menu_name] = [];
      }

      // Push dish details to the appropriate menu category
      acc.dishes_data[item.menu_name].push({
        dish_id: item.dish_id,
        dish_name: item.dish_name,
        dish_description: item.description,
        dish_price: item.price,
        dish_image: item.dish_image,
      });

      return acc;
    }, {});

    APIData(restaurantInfo)(req, res);
    if (Object.values(restaurantInfo).length == 0) {
      console.log(`Hotel Id:${restrau_Id}, Data not Found!`);
    } else {
      console.log(`Hotel Id:${restrau_Id}, Data fetched successfully!`);
    }
  } catch (err) {
    next(new APIError("Data not Found", 200, false, null));
    console.log(`Hotel Id:${restrau_Id}, Data not Found!`);
  }
};

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
  fetchResturants,
  fetchCart,
  insertCart,
};
