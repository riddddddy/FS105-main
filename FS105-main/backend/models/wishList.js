import mongoose from "mongoose";

const Schema = mongoose.Schema

const wishListSchema = new Schema({

    user_id: {
        type: String,
        required: true
    },

    bagName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

}, { timestamps: true })

const wishListModels = mongoose.model("wishListModels", wishListSchema)

export default wishListModels;