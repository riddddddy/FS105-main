import mongoose from "mongoose";
import cartModels from "../models/cart.js";

//POST item to cart

const addItemToCart = async (req, res) => {

    try {

        let {
            user_id,
            bagName,
            description,
            image,
            price,
            quantity = 1
        } = req.body;

        const item = await cartModels.create({ user_id, bagName, description, image, price, quantity })
        res.status(200).json({ item, message: 'item is added into cart' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


//GET items form cart

const getItems = async (req, res) => {

    const { id } = req.params
    try {
        const items = await cartModels.find({ user_id: id }).sort({ createdAt: -1 })
        res.status(200).json(items)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete items from cart

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        const cartItem = await cartModels.findOneAndDelete({ _id: id })

        if (!cartItem) {
            return res.status(400).json({ error: "No such item in the wishlist" })
        }

        res.status(200).json({ cartItem, message: `item ${cartItem._id} deleted successfully` })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//update cart

// const updateCart = async (req, res) => {

//     try {

//         const { id } = req.params

//         let cart = req.body.items
//         console.log(cart, "cart")

//         const userCart = await cartModels.find({ user_id: id })
//         console.log(userCart, "76")

//         const updatedCart = await cartModels.updateMany(
//             { user_id: id },
//             { $set: { bagName: cart.bagName, price: cart.price, image: cart.image, description: cart.description, quantity: cart.quantity } },
//         )

//         res.status(200).json({ message: "it is working from backend", updatedCart })

//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }

// }

const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItems = req.body.items;
        console.log(cartItems, "cartITemws")

        // Loop through each item in the cart and update it in the database. this takes time.
        const updatePromises = cartItems.map(async (cartItem) => {
            const updatedCart = await cartModels.updateMany(
                { user_id: id, 'bagName': cartItem.bagName },
                { $set: { 'quantity': cartItem.quantity, "price": cartItem.price } }
            );
            console.log(updatedCart, "updatedCart")
            return updatedCart;
        });

        const result = await Promise.all(updatePromises);

        console.log(result, "result")
        res.status(200).json({ message: "Updated userCart successfully", result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//delete ALL items from cart

const deleteAllItems = async (req, res) => {
    

    const {id} = req.params
    console.log(id)

    try {

        const cartItem = await cartModels.deleteMany({ user_id: id })

        console.log(cartItem, "cartItem")





        if (!cartItem) {
            return res.status(400).json({ error: "No such item in the wishlist" })
        }

        res.status(200).json({ cartItem, message: `items in cart has been deleted successfully` })

    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

export { addItemToCart, getItems, deleteItem, updateCart, deleteAllItems }