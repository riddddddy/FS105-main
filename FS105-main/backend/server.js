import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import itemInfo from './models/itemModels.js';
import messagesRouter from './routes/messageRoutes.js'
import productsRouter from './routes/productRoutes.js'
import cookieParser from 'cookie-parser'
import wishlistRouter from './routes/wishlistRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import reviewRouter from './routes/reviewRoutes.js';
import subscribeRouter from './routes/subscribeRoutes.js';

// import { Console } from 'console';
import Stripe from 'stripe';
import checkPassword from './middleware/autheticateCheckApi.js';


dotenv.config()

const app = express()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


app.get('/', (req, res) => {
  res.send('Hello World!!!')
})


//neccessary to have if post and patch requests are needed fyi Rid
app.use(express.json())

app.use(cors())

app.use(cookieParser())
// all the magic happen below
// ----------------------------------------------------------------------------------------------------
app.use('/api/users', userRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/products', productsRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/cart', cartRouter)

app.use('/api/reviews', reviewRouter)
app.use('/api/subscribe', subscribeRouter)
// ----------------------------------------------------------------------------------------------------

//for images on the product page front end
app.use(express.static('public'))

//upload image------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})


app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.file)

  const { bagName, price, description, numberOfStocks } = req.body

  try {

    if (!bagName || !price || !description || !numberOfStocks || !req.file) {
      throw Error("Please field in all empty fields")
    }


    const item = await itemInfo.create({ image: req.file.filename, bagName, price, description, numberOfStocks })
    console.log(item)
    res.status(200).json({ message: "registered item successfully", item });

  } catch (error) {
    res.status(400).json({ error: error.message })
  }


})
// --------------------------------------------------------------------------------------------------------------------------------//

// stripe
app.get("/config", checkPassword, (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/payment", async (req, res) => {
    try {
      const { products } = req.body; // Array Products

      const itemProducts = products.map((itemproduct) => ({
        price_data: {
          currency: "sgd",
          product_data: {
            name: itemproduct.bagName,
            images: [`https://fs105-main.onrender.com/${itemproduct.image}`], // Use base 64 to work properly the image
          },
          unit_amount: Math.round(itemproduct.priceTag * 100), // this is the amount
        },
        quantity: itemproduct.quantity,
      }));

  
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'paynow'],
        line_items: itemProducts, // Per line items
        mode: "payment",
        success_url: "http://localhost:3000/successpayment", // if success go to success url
        cancel_url: "http://localhost:3000/cart",
      });
  
    
      res.json({ id: session.id });
    } catch (err) {
      return res.status(501).json({ error: err.message });
    }
  });
  


// --------------------------------------------------------------------------------------------------------

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server and DB is running on port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error)
  })
