import Subscription from "../models/subscribeModels.js";

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
  
        // Check if the email already exists in the database
        const existingSubscription = await Subscription.findOne({ email });
  
        if (existingSubscription) {
            return res.status(200).json({ message: 'Email already subscribed' });
        }
  
        // If email doesn't exist, create a new subscription
        const newSubscription = new Subscription({ email });
        await newSubscription.save();
  
        res.status(201).json({ message: 'Subscription successful' });
      } catch (error) {
        console.error('Subscription failed:', error);
        res.status(500).json({ error: 'Failed to subscribe' });
      }
    
};

const getAllSubscribe = async (req, res) => {
    try {
      const subscribes = await Subscription.find();
      res.status(200).json(subscribes);
    } catch (error) {
      console.log('Error fetching subscribers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export {subscribe, getAllSubscribe };
