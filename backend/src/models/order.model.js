import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId : {
            type: String,
            required: true
        },
        items : {
            type: Array,
            required: true
        },
        amount : {
            type: Number,
            required: true
        },
        address : {
            type: Object,
            required: true
        },
        status : {
            type: String,
            default: "Payment pending..."
        },
        date : {
            type: Date,
            default: Date.now()
        },
        payment : {
            type: Boolean,
            default: false
        },
        razorpayOrderId : {
            type: String
        }
    }
)

export const Order = mongoose.model("Order", orderSchema);