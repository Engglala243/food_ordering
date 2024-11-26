<<<<<<< HEAD
<<<<<<< HEAD
const express = require("express");
const {
  validateRegister,
  validateLogin,
  validateRestaurantRegister,
} = require("../middlewares/authValidators.js");
const {
  register,
  login,
  restau_register,
  restau_login,
} = require("../controllers/authControllers.js");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post(
  "/restaurant/register",
  validateRestaurantRegister,
  restau_register,
);
router.post("/restaurant/login", validateLogin, restau_login);

module.exports = router;
=======
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
const express = require("express");
const {
  validateRegister,
  validateLogin,
  validateRestaurantRegister,
} = require("../middlewares/authValidators.js");
const {
  register,
  login,
  restau_register,
  restau_login,
} = require("../controllers/authControllers.js");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/restaurant/register",validateRestaurantRegister,restau_register);
router.post("/restaurant/login", validateLogin, restau_login);

<<<<<<< HEAD
module.exports = router;
>>>>>>> master
=======

module.exports = router;
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
