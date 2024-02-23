import React from 'react'
import { allData } from '../context/AppContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const SuccessPayment = () => {

    const { user } = useContext(allData)
    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Thank you for purchasing with us, {user?.user.firstName && `${user.user.firstName.charAt(0).toUpperCase()}${user.user.firstName.slice(1)}`}</h1>
                        <p class="py-6 text-2xl text-green-600">Your payment has been successful</p>
                        <Link to="/"><button class="btn btn-primary hover:bg-gray-700">Back to Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPayment