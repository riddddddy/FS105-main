import mongoose from "mongoose";

const Schema = mongoose.Schema

const messageSchema = new Schema({

    enquirerName: {
        type: String,
        required: true
    },

    enquirerEmail: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }

})

const messagesList = mongoose.model("messagesList", messageSchema)

export default messagesList