const express = require("express");
const {
  createPaymentOrder,
  handlePaymentVerification,
} = require("../utils/paymentGateway");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/create-order", verifyToken, createPaymentOrder);

router.post("/verify-payment", verifyToken, handlePaymentVerification);

module.exports = router;
