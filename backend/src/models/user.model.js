import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'password is required!']
        },
        cartData: {
            type: Object,
            default: {}
        },
        refreshToken: {
            type: String
        },
    },
    {   
        timestamps: true
    },
    {
        minimize: false
    }
)

// using the "Pre hook" middleware we can perform some operation JUST before it gets saved into the DB, 
// this below function checks is the password has been modified or not and if it is modified (or created new),
// then it'll hash the password before storing it into the DB

userSchema.pre("save", async function(next){
    // if the password is not modified or created new than return next
    if(!this.isModified("password")) return next();
    
    // // another way of hashing using salt
    // const salt = await bcrypt.genSalt(10);
    // const this.password = await bcrypt.hash(this.password, salt);

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// mongoose allows us to inject custom methods of our own using the "methods" middleware,
// the below function checks the password with the stored password to verify it.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// creating a method to generate access tokens
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        // object
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// creating a method to generate refresh tokens
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        // object
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema); // if the model is already created it'll use the old schema or else create a new one.