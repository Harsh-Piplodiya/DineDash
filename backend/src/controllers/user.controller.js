import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import validator from 'validator';

const generateAccessAndRefreshTokens = async (userID) => {
    try {
        const user = User.findById(userID);

        // both the methods are from user.model
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // here we add value of refresh token to the object
        user.refreshToken = refreshToken;
        // here using the save method we store the refresh token in the DB, but doing so normally will coz the DB to validate all the properties of the model but as here we only want to save the refresh token we use "validateBeforeSave" property and assign it as false. So that no validation occurs.
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token.");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // TODO:-
    // get user details from the frontend
    // check if all the fields have been filled or not
    // check if account already exists - email
    // validate the email and strong password
    // create new user object - create entry in the DB
    // check user creation
    // remove password and refreshToken field fron the response
    // return resposne
    
    const { name, email, password } = req.body;

    if( [name, email, password].some((field) => field?.trim() === "") ){
        throw new ApiError(400, "All fields are required!");
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        throw new ApiError(409, "User with the same email exists!");
    }

    // validating email and strong password
    if(!validator.isEmail(email)){
        throw new ApiError(400, "Please enter a valid email.");
    }

    if(password.length < 8){
        throw new ApiError(400, "Please enter a strong password");
    }

    /* // now we need to create a new user object to save/create new user in the DB
    // first way:
    const newUser = new User({
        name,
        email,
        password
    })

    // this will save the data of the user in the DB
    const user = await newUser.save(); */

    // second way:
    const user = await User.create({
        name: name.toLowerCase(),
        email,
        password
    })

    const userCreated = await User.findById(user._id).select(" -password -refreshToken ");

    if(!userCreated){
        throw new ApiError(500, "Something went wrong while registering user.");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, userCreated, "User registered Successfully!!"));
})

const loginUser = asyncHandler(async (req, res) => {
    // TODO:-
    // req body => data
    // username or email
    // find user
    // check password
    // generate access and refresh token
    // send cookies

    const { email, password } = req.body;

    if(!email){
        throw new ApiError(400, "Email is required!");
    }

    // finding the user
    const user = await User.findOne({ email });

    if(!user){
        throw new ApiError(400, "User does not exist.");
    }

    // checking if the password is valid or not using the isPasswordCorrect method we created in the user.model
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid credentials.")
    }

    // generating tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken "); 

    // cookies are modifiable from the front-end also but by making the options 'httpOnly' and 'secure' true,
    // cookies are only modifiable from the server.
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in Successfully!"));
})

export { registerUser, loginUser };