import { Router } from 'express';
import { addFoodItem, listFoodItems, removeFoodItems } from '../controllers/food.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.route("/add").post(upload.single("image"), addFoodItem);
router.route("/list").get(listFoodItems);
router.route("/remove").post(removeFoodItems);

export default router;