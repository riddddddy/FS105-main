import mongoose from "mongoose";

//schema to define structure of user models in the database

const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  const Subscription = mongoose.model('Subscription', subscriptionSchema);
  
export default Subscription;