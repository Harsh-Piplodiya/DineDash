import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

// add items to user cart
const addToCart = asyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.user?._id);
        let cartData  = await user.cartData;

        // debugging logs
        // console.log(req.user?._id);
        // console.log(user.cartData);
        // console.log(cartData[req.body.itemId]);

        // if no entry has been made than the first entry will be made
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        } else {
            // if entries exis than we'll simply increase the value of itemId by 1 
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(user._id, { cartData });

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Added to Cart."));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong!")
    }
})

// remove items from user cart
const removeFromCart = asyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.user?._id);
        let cartData = await user.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(user._id, { cartData });

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Removed from Cart."));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong.")
    }
})

// fetch user cart data
const getCart = asyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.user?._id);
        let cartData = await user.cartData;

        return res
        .status(200)
        .json(new ApiResponse(200, cartData, "Cart Items fetched Successfully."));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong.");
    }
})

export { addToCart, removeFromCart, getCart };