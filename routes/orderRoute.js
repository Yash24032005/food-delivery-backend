// import express from "express"
// import authMiddleware from "../middleware/auth.js"
// import { placeOrder, verifyOrder,userOrders ,listOrders,updateStatus} from "../controllers/orderController.js"

// const orderRouter = express.Router();

// orderRouter.post("/place",authMiddleware,placeOrder);
// orderRouter.post("/verify",verifyOrder)
// orderRouter.post("/userorders",authMiddleware,userOrders)//to convert auth token into middle ware
// orderRouter.get("/list",listOrders)
// orderRouter.post("/status",updateStatus)


// export default orderRouter;

// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Order from "../models/Order.js";
// import authMiddleware from "../middleware/auth.js";

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ PLACE ORDER (CREATE RAZORPAY ORDER)
// router.post("/place", authMiddleware, async (req, res) => {
//   try {
//     const { items, amount, address } = req.body;

//     // 1. Save order in DB (pending)
//     const newOrder = await Order.create({
//       userId: req.userId,
//       items,
//       amount,
//       address,
//       status: "Pending",
//     });

//     // 2. Create Razorpay order
//     const options = {
//       amount: amount * 100, // paise
//       currency: "INR",
//       receipt: newOrder._id.toString(),
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       orderId: newOrder._id,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       key: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error placing order" });
//   }
// });


// // ✅ VERIFY PAYMENT
// router.post("/verify", async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       // ✅ Payment verified → update order
//       await Order.findByIdAndUpdate(orderId, {
//         status: "Paid",
//       });

//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false });
//   }
// });

// export default router;

import express from "express";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", authMiddleware, listOrders);
orderRouter.post("/status", authMiddleware, updateStatus);

export default orderRouter;