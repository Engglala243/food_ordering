<<<<<<< HEAD
<<<<<<< HEAD
const Joi = require("joi");
const JoiPhoneNumber = require("joi-phone-number");
const { authError } = require("../utils/customResponse");

const myCustomJoi = Joi.extend(JoiPhoneNumber);

const userRegisterSchema = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(75)
    .required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),
});

const restaurantRegisterSchema = myCustomJoi.object({
  restaurant_name: myCustomJoi.string().min(3).max(30).required(),
  street: myCustomJoi.string().min(3).max(100).required(),
  country: myCustomJoi.string().min(3).max(25).required(),
  city: myCustomJoi.string().min(3).max(25).required(),
  phone: myCustomJoi.string().phoneNumber().required(),
  email: myCustomJoi.string().email().required(),
  password: myCustomJoi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(75)
    .required(),
  confirm_password: myCustomJoi
    .string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(75)
    .required(),
});

const validateRegister = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next();
};

const validateRestaurantRegister = (req, res, next) => {
  const { error } = restaurantRegisterSchema.validate(req.body);
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next();
};

module.exports = {
  validateRestaurantRegister,
  validateRegister,
  validateLogin,
};
=======
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
const Joi = require("joi");
const JoiPhoneNumber = require("joi-phone-number");
const { authError } = require("../utils/customResponse");

const myCustomJoi = Joi.extend(JoiPhoneNumber);

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(75)
    .required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),
});

const restaurantRegisterSchema = myCustomJoi.object({
  restaurant_name: myCustomJoi.string().min(3).max(30).required(),
  street: myCustomJoi.string().min(3).max(100).required(),
  state: myCustomJoi.string().min(1).max(100).required(),
  pincode: myCustomJoi.string().min(4).max(10).required(),
  country: myCustomJoi.string().min(1).max(25).required(),
  city: myCustomJoi.string().min(3).max(25).required(),
  phone: myCustomJoi.string().phoneNumber().required(),
  email: myCustomJoi.string().email().required(),
  password: myCustomJoi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(75)
    .required(),
  confirm_password: myCustomJoi
    .string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(75)
    .required(),
});

const validateRegister = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next();
};

const validateRestaurantRegister = (req, res, next) => {
  const { error } = restaurantRegisterSchema.validate(req.body);
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next();
};

module.exports = {
  validateRestaurantRegister,
  validateRegister,
  validateLogin,
};
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
