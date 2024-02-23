import express from 'express';
import  {subscribe, getAllSubscribe}  from '../controllers/subscribeController.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/', getAllSubscribe);

export default router;