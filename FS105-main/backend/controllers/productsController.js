import mongoose from "mongoose";
import itemInfo from "../models/itemModels.js";
import userAccount from '../models/userModels.js';


//GET all products data

const getProducts = async (req, res) => {

    try {
        const products = await itemInfo.find({}).sort({ createdAt: -1 })
        res.status(200).json(products)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//GET a single product

const singleProduct = async (req, res) => {
    try {

        const{bagName} = req.params
        
        console.log(bagName)

        const product = await itemInfo.findOne({bagName})

        

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Adds a product to the user's shopping cart
const addProductToCart = async (req, res) => {
    const userId = req.user.id; // Extracted user ID from JWT
    const { itemId, quantity = 1 } = req.body; // Assuming you pass the item's ID and quantity
  
    try {
      // Find the item by ID
      const item = await itemInfo.findById(itemId);
      if (!item) return res.status(404).json({ message: 'Item not found' });
  
      // Find the user
      const user = await userAccount.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if the item is already in the cart
      const itemIndex = user.cart.findIndex(ci => ci.item.toString() === itemId);
  
      if (itemIndex > -1) {
        // Item already in cart, update quantity
        user.cart[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        user.cart.push({
          item: item._id,
          quantity,
          bagName: item.bagName,
          price: item.price,
          image: item.image
        });
      }
  
      await user.save();
      res.json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


export { getProducts, singleProduct, addProductToCart };