import React from 'react'
import { useContext } from 'react'
import { allData } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

const Welcome = () => {

    const { user } = useContext(allData)

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{duration: .75}}
                className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello, {user?.user.firstName}!</h1>
                        <p className="py-6">
                            We're thrilled to have you back at <strong>LuxuriaLoom</strong>! Your presence adds a touch of elegance to our community.
                        </p>
                        <p>
                            Thank you for choosing <strong>LuxuriaLoom</strong>! Your presence makes our community even more vibrant. Happy shopping!

                        </p>
                        <Link to='/products'><button className="mt-5 btn btn-primary">Back to shopping</button></Link>
                        <Link to='/wishlist'><h1 className='mt-10 underline underline-offset-4 hover:cursor-pointer'>Explore Your Wishlist</h1></Link>
                    </div> 
                </motion.div>
            </div>
        </div>
    )
}

export default Welcome