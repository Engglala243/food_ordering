const express = require("express");
const router = express.Router();
const {
  addDishes,
  getDishes,
  updateDish,
  deleteDish,
} = require("../controllers/dishController.js");
const { handleDishUpload } = require("../middlewares/fileUpload.js");
const { verifyToken } = require("../middlewares/verifyToken.js");

// Route to add dishes
router.post("/add", verifyToken, handleDishUpload, addDishes);

// Route to get dishes by menu ID
router.get("/:menuId", verifyToken, getDishes);

// Route to update a dish
router.put("/:dishId", verifyToken, handleDishUpload, updateDish);

// Route to delete a dish
router.delete("/:dishId", verifyToken, deleteDish);

module.exports = router;
