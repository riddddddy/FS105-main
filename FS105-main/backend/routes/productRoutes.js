import mongoose from "mongoose";
import { getProducts, singleProduct, addProductToCart } from "../controllers/productsController.js";

import express from 'express'

const router = express.Router()
//GET all products route

router.get('/', getProducts)

//GET single product
router.get('/:bagName', singleProduct)

// POST a product to the cart
router.post('/add-to-cart', addProductToCart);

export default router