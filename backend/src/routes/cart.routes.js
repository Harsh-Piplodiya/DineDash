import { Router } from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const cartRouter = Router();

cartRouter.route("/add").post(verifyJWT, addToCart);
cartRouter.route("/remove").post(verifyJWT, removeFromCart);
cartRouter.route("/get").post(verifyJWT, getCart);

export default cartRouter;