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
    // console.log("Req body: ", req.body);

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
        // after the order payment is verified we remove the cartData also
        await User.findByIdAndUpdate(req.user?._id, { $set: { cartData: {} } });

        // order creation for razorpay
        const options = {
            amount: req.body.amount * 100, // in paise
            currency: "INR",
            receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
            payment_capture: 1 
        }
    
        const razorpayOrder = await razorpay.orders.create(options);

        return res
        .status(200)
        .json(new ApiResponse(200, { order, razorpayOrder }, "Order Successful"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Some Error occured");
    }
});

const verifyPayment = asyncHandler(async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
    
        const body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
    
        if (expectedSignature !== razorpay_signature) {
            // if the payment fails we delete the order information
            await Order.findByIdAndDelete(orderId);
    
            return res
            .status(400)
            .json(new ApiResponse(400, {}, "Payment not done"));
        } else {
            // after verifying the payment we change the status of payment to true.
            await Order.findByIdAndUpdate(orderId, { status: "Food Processing..." }, { payment: true });
    
            return res
            .status(200)
            .json(new ApiResponse(200, {}, "Payment verified successfully"));
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Some error occured while handling payment!");
    }
});

const userOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find({ userId: req.user?._id });

        return res
        .status(200)
        .json(new ApiResponse(200, orders, "Orders fetched successfully."));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Some error occured!");
    }
})

export { placeOrder, verifyPayment, userOrders };