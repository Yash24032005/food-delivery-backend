import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// create order
router.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // paise
    currency: "INR",
    receipt: "receipt_order"
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
});

export default router;