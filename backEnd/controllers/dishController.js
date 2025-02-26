const { customRecord } = require("../utils/sqlFunctions");
const { customResponse, APIData } = require("../utils/customResponse");
const fs = require("fs");
const path = require("path");

const addDishes = async (req, res, next) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  res.header("Access-Control-Allow-Origin", "*");

  const { menuId } = req.body;
  const restaurant_id = req.user.restaurant_id;

  try {
    // Verify menuId belongs to restaurant
    const menuQuery = `SELECT * FROM menu WHERE menu_id = ? AND restaurant_id = ?`;
    const menuResult = await customRecord(menuQuery, [menuId, restaurant_id]);
    if (menuResult.length === 0) {
      return customResponse(
        "Menu not found or doesn't belong to this restaurant",
        404,
        false,
      )(req, res);
    }

    // Get restaurant name
    const restaurantQuery = `SELECT restaurant_name FROM restaurants WHERE restaurant_id = ?`;
    const restaurantResult = await customRecord(restaurantQuery, [
      restaurant_id,
    ]);
    const restaurantName = restaurantResult[0].restaurant_name;
    const menuName = menuResult[0].name;

    // Process dishes
    const dishes = [];
    let index = 0;

    while (req.body[`dishData${index}`]) {
      const dishData = JSON.parse(req.body[`dishData${index}`]);
      const imageFile = req.files[`dish${index}`]?.[0];

      let imagePath = null;
      if (imageFile) {
        imagePath = `/public/${restaurantName}/${menuName}/${imageFile.filename}`;
      }

      dishes.push({
        ...dishData,
        imagePath,
        menuId,
      });

      index++;
    }

    // Insert dishes into database
    const insertPromises = dishes.map(async (dish) => {
      const query = `INSERT INTO dishes (name, description, price, dish_image, menu_id) VALUES (?, ?, ?, ?, ?)`;
      return await customRecord(query, [
        dish.name,
        dish.description,
        dish.price,
        dish.imagePath,
        menuId,
      ]);
    });

    await Promise.all(insertPromises);
    customResponse("Dishes added successfully!", 200, true)(req, res);
  } catch (err) {
    console.error(`Error adding dishes: ${err}`);
    customResponse(`Error: ${err.message}`, 500, false)(req, res);
  }
};

const updateDish = async (req, res, next) => {
  const { dishId } = req.params;
  const restaurant_id = req.user.restaurant_id;

  try {
    const verifyQuery = `
      SELECT d.* FROM dishes d 
      JOIN menu m ON d.menu_id = m.menu_id 
      WHERE d.dish_id = ? AND m.restaurant_id = ? AND d.is_deleted = 0
    `;
    const verifyResult = await customRecord(verifyQuery, [
      dishId,
      restaurant_id,
    ]);
    if (verifyResult.length === 0) {
      return customResponse(
        "Dish not found or doesn't belong to this restaurant",
        404,
        false,
      )(req, res);
    }

    const dishData = JSON.parse(req.body.dishData);
    let imagePath = verifyResult[0].dish_image;

    if (req.files && req.files.image) {
      const restaurantQuery = `SELECT restaurant_name FROM restaurants WHERE restaurant_id = ?`;
      const restaurantResult = await customRecord(restaurantQuery, [
        restaurant_id,
      ]);
      const restaurantName = restaurantResult[0].restaurant_name;

      const menuQuery = `SELECT name FROM menu WHERE menu_id = ?`;
      const menuResult = await customRecord(menuQuery, [
        verifyResult[0].menu_id,
      ]);
      const menuName = menuResult[0].name;

      imagePath = `/public/${restaurantName}/${menuName}/${req.files.image[0].filename}`;
    }

    const updateQuery = `
      UPDATE dishes 
      SET name = ?, description = ?, price = ?, dish_image = ?, modified_by = ?, modified_at = NOW() 
      WHERE dish_id = ?
    `;

    await customRecord(updateQuery, [
      dishData.name,
      dishData.description,
      dishData.price,
      imagePath,
      req.user.email,
      dishId,
    ]);

    customResponse("Dish updated successfully!", 200, true)(req, res);
  } catch (err) {
    console.error(`Error updating dish: ${err}`);
    customResponse(`Error: ${err.message}`, 500, false)(req, res);
  }
};

const getDishes = async (req, res, next) => {
  const { menuId } = req.params;
  const restaurant_id = req.user.restaurant_id;

  try {
    // First, verify the menuId belongs to this restaurant
    const menuQuery = `SELECT * FROM menu WHERE menu_id = ? AND restaurant_id = ?`;
    const menuResult = await customRecord(menuQuery, [menuId, restaurant_id]);

    if (menuResult.length === 0) {
      return customResponse(
        "Menu not found or doesn't belong to this restaurant",
        404,
        false,
      )(req, res);
    }

    // Get dishes for the menu
    const query = `SELECT * FROM dishes WHERE menu_id = ? AND is_deleted = 0`;
    const dishesData = await customRecord(query, [menuId]);

    APIData(dishesData)(req, res);
  } catch (err) {
    console.error(`Error fetching dishes: ${err}`);
    customResponse(`Error: ${err.message}`, 500, false)(req, res);
  }
};

const deleteDish = async (req, res, next) => {
  const { dishId } = req.params;
  const restaurant_id = req.user.restaurant_id;

  try {
    // First, verify the dish belongs to this restaurant
    const verifyQuery = `
      SELECT d.* FROM dishes d 
      JOIN menu m ON d.menu_id = m.menu_id 
      WHERE d.dish_id = ? AND m.restaurant_id = ? AND d.is_deleted = 0
    `;
    const verifyResult = await customRecord(verifyQuery, [
      dishId,
      restaurant_id,
    ]);

    if (verifyResult.length === 0) {
      return customResponse(
        "Dish not found or doesn't belong to this restaurant",
        404,
        false,
      )(req, res);
    }

    // Soft delete the dish
    const deleteQuery = `
      UPDATE dishes 
      SET is_deleted = 1, modified_by = ?, modified_at = NOW() 
      WHERE dish_id = ?
    `;
    await customRecord(deleteQuery, [req.user.email, dishId]);

    customResponse("Dish deleted successfully!", 200, true)(req, res);
  } catch (err) {
    console.error(`Error deleting dish: ${err}`);
    customResponse(`Error: ${err.message}`, 500, false)(req, res);
  }
};

module.exports = {
  addDishes,
  getDishes,
  updateDish,
  deleteDish,
};
