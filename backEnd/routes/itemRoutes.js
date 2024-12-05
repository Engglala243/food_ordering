const express = require("express");
const {
  fetchResturants,
  fetchCart,
  insertCart,
} = require("../controllers/itemController.js");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AppError = require("../utils/customErrors");
const { customResponse } = require("../utils/customResponse");
const uploadImages = require("../middlewares/fileUpload.js");
const { verifyToken } = require("../middlewares/verifyToken.js");

router.get("/data", fetchResturants);
router.get("/cart-data", fetchCart);
router.post("/cart", insertCart);

module.exports = router;
