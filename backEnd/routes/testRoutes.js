const express = require("express");
const router = express.Router();
const { getMenuData } = require("../controllers/testController");

router.get("/:restaurant_id", getMenuData);

module.exports = router;
