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
            default: "Payment Not Done!"
        },
        date : {
            type: Date,
            default: Date.now()
        },
        payment : {
            type: Boolean,
            default: false
        }
    }
)

export const Order = mongoose.model("Order", orderSchema);