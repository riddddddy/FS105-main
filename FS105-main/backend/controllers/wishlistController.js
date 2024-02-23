import mongoose from "mongoose";
import wishListModels from "../models/wishList.js";


//GET all wishlist products

const getAllWishListProducts = async (req, res) => {

    // const id = req.user._id
    // console.log(id)
    // const userId = req.headers.authorization.split(' ')[1];

    // const {id} = req.query

    const {id} = req.params

    // console.log(userId)

    try {

        const allWishlistProducts = await wishListModels.find({user_id: id}).sort({ createdAt: -1 })
        res.status(200).json(allWishlistProducts)

    } catch (error) {

        res.status(500).json({ error: error.message })

    }
}


//POST wishlist to the database

const addProduct = async (req, res) => {


    //add data into db
    try {


        let {
            user_id,
            bagName,
            description,
            image,
            price
        } = req.body;

        const product = await wishListModels.create({ user_id, bagName, description, image, price })
        res.status(200).json({ product, message: "Product added into wishlist successfully" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//DELETE item from wishlist
const deleteWishlistItem = async (req, res) =>{

    try {
        const {id} = req.params
        console.log(id)

        const wishlistItem = await wishListModels.findOneAndDelete({_id: id})

        if(!wishlistItem){
            return res.status(400).json({error:"No such item in the wishlist"})
        }

        res.status(200).json({wishlistItem, message:`item ${wishlistItem._id} deleted successfully`})

    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

export { getAllWishListProducts, addProduct, deleteWishlistItem }