const express = require("express");
const router = express.Router();
const { insertDish } = require("../controllers/dishController");

router.post("/dish/insert", insertDish);

module.exports = router;
