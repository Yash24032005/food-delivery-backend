// import express from "express"
// import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js"
// import authMiddleware from "../middleware/auth.js";

// const cartRouter = express.Router();

// // cartRouter.get("/", authMiddleware, getCart)
// // Is line ko change karein (GET se POST)
// cartRouter.post("/get", authMiddleware, getCart)
// cartRouter.post("/add", authMiddleware, addToCart)
// cartRouter.post("/remove", authMiddleware, removeFromCart)

// export default cartRouter;
import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// Frontend StoreContext se POST request bhej raha hai, isliye yahan POST zaroori hai
cartRouter.post("/get", authMiddleware, getCart); 
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);

export default cartRouter;