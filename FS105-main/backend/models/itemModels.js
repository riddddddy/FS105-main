import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
    // image: String,

    image:{
        type: String,
        required:true
    },

    bagName: {
        type: String,
        required:true
    },

    price: {
        type: Number,
        required:true
    },

    numberOfStocks: {
        type:Number,
        required:true
    },

    description: {
        type: String,
        required:true
    }
})

const itemInfo = mongoose.model('itemInfo', itemSchema)

export default itemInfo