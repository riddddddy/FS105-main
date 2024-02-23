import express from 'express'
import { postMessage, getMessages } from '../controllers/messageController.js'

const router = express.Router()

//post message to database from front end contact us page
router.post('/submitmessage', postMessage)


//get all messages from the database
router.get('/allmessages', getMessages)


export default router