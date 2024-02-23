import mongoose from "mongoose";

//schema to define structure of user models in the database

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unqiue: true
    },

    password: {
        type: String,
        required: true,
    },

    password1: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    }, 
    
    address: {
        type: String,
        required: true
    },

    city: {
        type:String,
        required:true
    },

    province: {
        type:String,
        required:true
    },

    postalCode: {
        type:Number,
        required:true
    },
    
    resetPasswordToken: {
        type: String,
        required: false,
    },

    resetPasswordExpires: {
        type: Date,
        required: false,
    },
    role:{
        type:String,   
    },
    // cart:[]
        
    })



const userAccount = mongoose.model('userAccount', userSchema)

export default userAccount;