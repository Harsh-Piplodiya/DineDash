import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;