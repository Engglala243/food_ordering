const express = require("express");
const { createPaymentOrder, handlePaymentVerification} = require("../utils/razorPaySDK");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/create-order", createPaymentOrder);

router.post("/verify-payment", handlePaymentVerification);

module.exports = router;