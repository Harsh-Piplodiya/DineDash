import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { placeOrder, verifyPayment } from "../controllers/order.controller.js";

const orderRouter = Router();

// secured routes
orderRouter.route("/place").post(verifyJWT, placeOrder);
orderRouter.route("/verify").post(verifyPayment);

export default orderRouter;