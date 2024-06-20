import express from 'express';
import cors from 'cors';

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

// api endpoint, routes import
import userRouter from './routes/food.routes.js';

// routes declaration 
app.use("/api/v1/food", userRouter);

// ex: http://localhost:4000/api/v1/food

export { app };