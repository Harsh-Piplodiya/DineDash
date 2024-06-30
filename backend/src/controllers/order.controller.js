import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Razorpay from 'razorpay';
import crypto from 'crypto';

// first we need to instantiate the razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// placing user order for frontend
const placeOrder = asyncHandler(async (req, res) => {
    const frontend_url = "http://localhost:4000";

    console.log("Req body: ", req.body);

    try {
        // creating the order for DB
        const order = new Order({
            userId: req.user?._id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        // saving the data in DB
        await order.save();
        console.log("Order: ", order);
        // after the order is placed we need to remove the cartData
        await User.findByIdAndUpdate(req.body.userId, { $set: { cartData: {} } });

        // order creation for razorpay
        const options = {
            amount: req.body.amount * 100, // in paise
            currency: "INR",
            receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
            payment_capture: 1 
        }
    
        const razorpayOrder = await razorpay.orders.create(options);
        console.log('Razorpay Order:', razorpayOrder);

        return res
        .status(200)
        .json(new ApiResponse(200, { order, razorpayOrder }, "Order Successful"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Some Error occured");
    }
});

const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
        console.log("sig received: ", razorpay_signature);
        console.log("sig expected: ", expectedSignature);

    if (expectedSignature !== razorpay_signature) {
        throw new ApiError(400, "Invalid payment signature");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Payment verified successfully"));
});

export { placeOrder, verifyPayment };