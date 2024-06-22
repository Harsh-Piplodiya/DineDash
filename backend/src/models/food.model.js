import mongoose, { Schema } from 'mongoose';

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: Array,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }
)

export const Food = mongoose.model("Food", foodSchema);