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

    console.log(req.body);

    try {
        // creating the order for DB
        const order = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        // saving the data in DB
        await order.save();
        console.log(order);
        // after the order is placed we need to remove the cartData
        const savedOrder = await User.findByIdAndUpdate(req.body.userId, { cartData: {} });
        console.log(savedOrder);

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
        .json(new ApiResponse(200, { order: savedOrder, razorpayOrder }, "Order Successful"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Some Error occured");
    }
});

const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');

    if (generatedSignature !== razorpaySignature) {
        throw new ApiError(400, "Invalid payment signature");
    }

    const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpayOrderId },
        { status: 'Food Processing...', razorpayPaymentId: razorpayPaymentId },
        { new: true }
    );

    await User.findByIdAndUpdate(order.userId, { cartData: {} });

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Payment verified successfully"));
});

const fetchDetails = asyncHandler(async (req, res) => {
    const { paymentId } = req.params;

    try {
        // using this we will fetch the the deatils of the paymnet which is done using paymentId
        const payment = await razorpay.payments.fetch(paymentId);

        if(!payment){
            throw new ApiError(500, "Error at razorpay loading");
        }

        return res
        .status(200)
        .json(new ApiResponse(200, { status: payment.status, method: payment.method, amount: payment.amount, currency: payment.currency }, "Fetch Successful"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch");
    }
})

export { placeOrder, verifyPayment, fetchDetails };