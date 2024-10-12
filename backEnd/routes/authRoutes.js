const express = require("express");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/authValidators.js");
const { register, login } = require("../controllers/authControllers.js");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
