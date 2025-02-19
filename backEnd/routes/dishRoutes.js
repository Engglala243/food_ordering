const express = require("express");
const router = express.Router();
const { insertDish } = require("../controllers/dishController");
const { handleFileUpload } = require("../middlewares/fileUpload");

router.post("/dishes", handleFileUpload, insertDish);
router.get("/dishes", getDishes);

module.exports = router;
