import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // Debugging logs
        // console.log("Cookies: ", req.cookies);
        // console.log("Extracted Token: ", token);

        if (!token) {
            throw new ApiError(401, "Unauthorized request.");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            // console.log("Token verification failed:", error.message);
            throw new ApiError(401, "Invalid access token");
        }

        const userId = decodedToken?._id;
        if (!userId) {
            throw new ApiError(401, "Invalid access token");
        }

        const user = await User.findById(userId).select("-password -refreshToken");
        if (!user) {
            // console.log("No user found with the given ID:", userId);
            throw new ApiError(401, "Invalid access token");
        }

        // console.log(user);
        req.user = user;
        next();
    } catch (error) {
        // console.log("JWT verification middleware error:", error.message);
        next(new ApiError(401, error.message || "Unauthorized request."));
    }
});
