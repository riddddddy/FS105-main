import mongoose from "mongoose";

const Schema = mongoose.Schema

const cartSchema = new Schema({

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
    },

    quantity: {
        type: Number
    },

}, { timestamps: true })

const cartModels = mongoose.model("cartModels", cartSchema)

export default cartModels;