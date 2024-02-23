import express from 'express'
import { getAllUsers, createUser, loginUser, deleteUser, forgotPassword, resetPassword, logoutUser, updateUser, getUser } from '../controllers/userController.js'

const router = express.Router()

//GET all users
router.get('/',getAllUsers)

//POST create user/sign up user
router.post('/register',createUser)

//POST login user
router.post('/login',loginUser)

//DELETE user
router.delete('/:id', deleteUser)

// POST forgot password
router.post('/forgot-password', forgotPassword);

// PATCH reset password
router.patch('/reset-password', resetPassword);

//GET logout user
router.get('/logout', logoutUser)

//PATCH update user
router.patch('/update/:id', updateUser)


//GET single user
router.get('/:id', getUser)

export default router