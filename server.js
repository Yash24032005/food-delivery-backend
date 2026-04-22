import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from 'express';
import cors from 'cors';
// import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import authRoute from "./routes/authRoute.js";
import userRouter from './routes/userRoute.js';
// import 'dotenv/config.js';
import cartRouter from './routes/cartRoute.js';
import paymentRoute from "./routes/paymentRoute.js";
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express();
// const port = 4000 ki jagah ye likho
const port = process.env.PORT || 4000;


//middleware
app.use(express.json());
// purane app.use(cors()) ko hata kar ye likho
app.use(cors({
    origin: [
        "https://yash24032005.github.io", 
        "https://food-delivery-frontend-delta-jet.vercel.app", // Slash hata diya
        "http://localhost:5173" // Local testing ke liye ye zaroori hai
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// Baki ka saara code same rahega
const getToken = () => localStorage.getItem("token");

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter);
app.use("/api/auth", authRoute);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRoute);
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRouter)


app.get('/', (req, res) => {
    res.send('API Working');
})



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


console.log("ENV CHECK:", process.env.MONGO_URI);
