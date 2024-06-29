import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { placeOrder } from "../controllers/order.controller.js";

const orderRouter = Router();

// secured routes
orderRouter.route("/place").post(verifyJWT, placeOrder);

export default orderRouter;