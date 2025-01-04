const Razorpay = require("razorpay");
const crypto = require("crypto");
const { insertRecord } = require("./sqlFunctions");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const createPaymentOrder = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    console.log("Order created:", order);
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const handlePaymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_amount,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(sign.toString())
      .digest("hex");

    const razorpay_details = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };

    const paymentRecord = {
      user_id: req.user.user_id,
      amount: order_amount / 100,
      razorpay_details: JSON.stringify(razorpay_details),
      status: "successful",
      created_by: req.user.user_id,
    };

    if (razorpay_signature === expectedSign) {
      await insertRecord("payment_table", paymentRecord);
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res
      .status(500)
      .json({ message: "Verification failed", error: error.message });
  }
};

module.exports = {
  createPaymentOrder,
  handlePaymentVerification,
};
