const express = require("express");
const { fetchItems, insertItems } = require("../controllers/itemController.js");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AppError = require("../utils/customErrors");
const { customResponse } = require("../utils/customResponse");
const uploadImages = require("../middlewares/fileUpload.js");
const verifyToken = require("../utils/verifyToken.js");

router.get("/data", verifyToken(), fetchItems);

router.post("/additem", uploadImages("images", 4), insertItems);

module.exports = router;
