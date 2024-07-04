import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { placeOrder, userOrders, verifyPayment } from "../controllers/order.controller.js";

const orderRouter = Router();

// secured routes
orderRouter.route("/place").post(verifyJWT, placeOrder);
orderRouter.route("/verifyPayment").post(verifyPayment);
orderRouter.route("/userorders").post(verifyJWT, userOrders);

export default orderRouter;