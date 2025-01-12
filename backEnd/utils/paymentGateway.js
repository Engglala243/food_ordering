const Razorpay = require("razorpay");
const crypto = require("crypto");
const { insertRecord, customRecord } = require("./sqlFunctions");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const createPaymentOrder = async (req, res) => {
  try {
    console.log(
      Number(req.body.amount * 100),
      "<===order amount before creation",
    );
    const options = {
      amount: parseInt(req.body.amount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    console.log("Order created:", order);

    const paymentRecord = {
      user_id: req.user.user_id,
      amount: req.body.amount,
      pay_order_id: order.id,
      status: "pending",
      created_by: req.user.user_id,
    };

    await insertRecord("payment_table", paymentRecord);
    res.json(order);
  } catch (error) {
    const paymentRecord = {
      user_id: req.user.user_id,
      amount: Number(req.body.amount),
      status: "failed",
      created_by: req.user.user_id,
    };

    await insertRecord("payment_table", paymentRecord);
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const handlePaymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const query = `UPDATE payment_table 
                     SET status = 'successful'
                     WHERE pay_order_id = ?`;
      await customRecord(query, razorpay_order_id);

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
