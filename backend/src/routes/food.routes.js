import { Router } from 'express';
import { addFoodItem, listFoodItems, removeFoodItems } from '../controllers/food.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const foodRouter = Router();

foodRouter.route("/add").post(upload.single("image"), addFoodItem);
foodRouter.route("/list").get(listFoodItems);
foodRouter.route("/remove").post(removeFoodItems);

export default foodRouter;