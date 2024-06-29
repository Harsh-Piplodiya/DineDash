import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import stripe from "stripe";

// placing user order for frontend
const placeOrder = asyncHandler(async (req, res) => {});

export { placeOrder };