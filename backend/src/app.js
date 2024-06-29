import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// app config
const app = express();
const port = 4000;

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// api endpoint, routes import
import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.route.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';

// routes declaration 
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// ex: http://localhost:4000/api/v1/food

export { app };