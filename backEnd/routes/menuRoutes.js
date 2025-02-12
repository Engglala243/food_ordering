const express = require("express");
const router = express.Router();
const { insertMenu, getMenu } = require("../controllers/menuController.js");
const { verifyToken } = require("../middlewares/verifyToken.js");

router.post("/menu", verifyToken, insertMenu);
router.get("/menu", verifyToken, getMenu);

module.exports = router;
