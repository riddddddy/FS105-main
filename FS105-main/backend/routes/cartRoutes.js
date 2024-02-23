import express from 'express'
import { addItemToCart, deleteItem, getItems, updateCart, deleteAllItems } from '../controllers/cartController.js'


const router = express.Router()

//POST item to cart (route)
router.post('/', addItemToCart)


//GET item from cart (route)
router.get('/:id', getItems)

//delete item from cart(route)
router.delete('/:id', deleteItem)

//Patch update cart items(route)
router.patch('/:id', updateCart)

//delete all item from cart(route)
router.delete('/delete/:id', deleteAllItems)


export default router