const { customRecord } = require("../utils/sqlFunctions");
const { customResponse, APIData } = require("../utils/customResponse");
const fs = require("fs");
const path = require("path");

const insertDish = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { name, description, price, menu_id } = req.body;
  const restaurant_id = req.user.restaurant_id;

  try {
    // Check if dish already exists
    const existsQuery = `SELECT * from dishes WHERE name = ? AND menu_id = ? AND is_deleted = 0`;
    const existingDish = await customRecord(existsQuery, [name, menu_id]);

    if (existingDish.length !== 0) {
      // Remove uploaded file if dish exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return customResponse(
        `Dish "${name}" already exists in this menu!`,
        500,
        false,
      )(req, res);
    }

    // Get relative path for database storage
    const relativePath = req.file
      ? path.relative("public", req.file.path).replace(/\\/g, "/")
      : null;

    // Insert dish with image path
    const query = `INSERT INTO dishes (name, description, price, dish_image, menu_id, created_by) 
                  VALUES (?, ?, ?, ?, ?, ?)`;

    await customRecord(query, [
      name,
      description,
      price,
      relativePath,
      menu_id,
      req.user.username || "admin",
    ]);

    customResponse("Dish added successfully!", 200, true)(req, res);
  } catch (err) {
    // Remove uploaded file if insertion fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.log(`Dish insert error: ${err}`);
    customResponse(`Error: ${err}`, 500, false)(req, res);
  }
};

const getDishes = async (req, res, next) => {
  const restaurant_id = req.user.restaurant_id;

  try {
    const query = `
      SELECT d.*, m.name as menu_name 
      FROM dishes d 
      JOIN menu m ON d.menu_id = m.menu_id 
      WHERE m.restaurant_id = ? AND d.is_deleted = 0
    `;
    const dishesData = await customRecord(query, [restaurant_id]);

    // Add full URL path to dish images
    const dishesWithFullPath = dishesData.map((dish) => ({
      ...dish,
      dish_image: dish.dish_image
        ? `${req.protocol}://${req.get("host")}/${dish.dish_image}`
        : null,
    }));

    APIData(dishesWithFullPath)(req, res);
  } catch (err) {
    console.log(`Error: ${err}`);
    customResponse(`Error: ${err}`, 402, false)(req, res);
  }
};

module.exports = {
  insertDish,
  getDishes,
};
