import React, { useContext, useState, useEffect } from 'react'
import { allData } from "../context/AppContext.js";
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {

    const { cartItems, setCartItems, user } = useContext(allData)
    const [shouldFetch, setShouldFetch] = useState(true)
    const [total, setTotal] = useState(0)



    //to get all the items from cart


    useEffect(() => {

        getCartItems()

    }, [shouldFetch])

    const handlePayment = async () => {

        const headers = {
            "Content-Type": "application/json",

        };

        const responseget = await fetch(`/config?password=${process.env.REACT_APP_API_KEY}`)

        const apidata = await responseget.json();

        const stripe = await loadStripe(apidata.publishableKey);

        const body = {
            products: cartItems,
        }

        const response = await fetch(`/payment`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        })

        const session = await response.json();

        const results = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (results.error) {
            console.log(results.error)
        }

        const response2 = await fetch(`/api/cart/delete/${user?.user._id}`, {
            method: "DELETE"
        })
        const json2 = await response2.json()

        if (!response2.ok) {
            console.log(json2.error)
        }

        if (response2.ok) {
            console.log(json2.message)
        }

    }


    const getCartItems = async () => {

        const response = await fetch(`/api/cart/${user?.user._id}`)
        const data = await response.json()
        setCartItems(
            data.map(cartItem => {
                return {
                    _id: cartItem._id,
                    user_id: cartItem.user_id,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    priceTag: cartItem.price,
                    image: cartItem.image,
                    bagName: cartItem.bagName,
                    description: cartItem.description,
                    createdAt: cartItem.createdAt,
                    updatedAt: cartItem.updatedAt,
                };
            })
        );

        console.log(cartItems)

        const totalAmt = cartItems.reduce((accumulator, item) => {
            return accumulator + item.price
        }, 0)

        setTotal(totalAmt)
        setShouldFetch(false)

    }


    const incrementHandler = (item) => {
        console.log(item._id)
        // item.quantity = item.quantity + 1
        // setCartItems([...cartItems, [...item, item.quantity]])

        // Find the index of the item in the cart
        const itemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
        console.log(itemIndex)

        // Create a new array with the updated item
        const updatedCartItems = [...cartItems];
        updatedCartItems[itemIndex] = { ...item, quantity: item.quantity + 1, price: item.price * (item.quantity + 1) / item.quantity };

        // Update the state with the new array
        setCartItems(updatedCartItems);

        const totalAmt = updatedCartItems.reduce((accumulator, item) => {
            return accumulator + item.price
        }, 0)

        console.log(totalAmt)

        setTotal(totalAmt)


    }

    const decrementHandler = (item) => {
        const itemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id)
        console.log(itemIndex)

        const updatedCartItems = [...cartItems]

        if (item.quantity === 1) {
            updatedCartItems[itemIndex] = { ...item, quantity: 1 }
            setCartItems(updatedCartItems)
            console.log("item cannot be less than 0")
            return
        }

        updatedCartItems[itemIndex] = { ...item, quantity: item.quantity - 1, price: item.price * (item.quantity - 1) / item.quantity }



        setCartItems(updatedCartItems)

        const totalAmt = updatedCartItems.reduce((accumulator, item) => {
            return accumulator + item.price
        }, 0)

        console.log(totalAmt)

        setTotal(totalAmt)
    }

    if (cartItems.length === 0) {
        return (
            <div className='container text-center'>
                Your cart is empty.
                <Link to='/products'><div className='underline underline-offset-4 hover:no-underline hover:text-xl'>Click here to continue shopping</div></Link>
            </div>
        )
    }


    // delete button
    const deleteButton = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
    </svg>

    const deleteHandler = async (id) => {
        const response = await fetch(`/api/cart/${id}`, {
            method: "DELETE"
        })

        const data = await response.json()

        if (!response.ok) {
            console.log(data.error)
        }

        if (response.ok) {
            console.log(data)
            setShouldFetch(true)
        }
    }


    //update cart

    const updateCartHandler = async () => {
        console.log("update cart handler is working")
        console.log(cartItems)
        const data = {
            items: cartItems
        }
        const response = await fetch(`/api/cart/${user?.user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data)
        })

        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            console.log(json.error, "whats wring?")
        }


    }


    return (

        <div>
            {/* <h1 className='text-center text-2xl'>My Cart</h1> */}
            {/* {cartItems.map(item => {
                    return (
                        <div key={item._id}>
                            {item.bagName}{item.price}{item.image}{item.description}{item.quantity}
                        </div>
                    )
                })} */}


            <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                    </div>
                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8">
                                        {cartItems.map((item, index) => (
                                            <React.Fragment key={`${index}`}>
                                                <li className="flex flex-col justify-center items-center space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                    <div className="shrink-0">
                                                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`http://localhost:5000/Images/${item.image}`} alt={item.bagName} />
                                                    </div>

                                                    <div className="relative flex flex-1 flex-col justify-center items-center">
                                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                            <div className="pr-8 sm:pr-5">
                                                                <p className="text-base pt-2 sm:pt-0 font-semibold text-gray-900">{item.bagName}</p>
                                                            </div>

                                                            <div className="mt-4 flex items-start justify-between sm:mt-0 sm:items-start sm:justify-between">

                                                                <p className="mr-8 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:mr-0 sm:text-right">${item.price}</p>

                                                                <div className="sm:order-1">
                                                                    <div className=" flex h-8 items-stretch text-gray-600">
                                                                        <button onClick={() => decrementHandler(item)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                                                                        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                                                                        <button onClick={() => incrementHandler(item)} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                                                                    </div>
                                                                </div>

                                                                <div className='ml-4 hover:cursor-pointer sm:order-3' onClick={() => deleteHandler(item._id)}>
                                                                    {deleteButton}
                                                                </div>

                                                            </div>


                                                        </div>

                                                    </div>


                                                </li>
                                                {/* Additional items like subtotal, shipping, and total can stay outside the map */}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </div>

                                {/* Subtotal, Shipping, and Total sections */}
                                <div className="mt-6 border-t border-b py-2">
                                    {/* <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Subtotal</p>
                                        <p className="text-lg font-semibold text-gray-900">$399.00</p>
                                    </div> */}
                                    {/* <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-400">Shipping</p>
                                            <p className="text-lg font-semibold text-gray-900">$8.00</p>
                                        </div> */}
                                </div>

                                <div className='flex justify-end'>
                                    <button onClick={updateCartHandler} className='btn btn-primary text-white no-animation'>Update Cart</button>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">SGD</span>{total}</p>
                                </div>

                                <div className="mt-6 text-center">
                                    <button onClick={handlePayment} type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                        Checkout
                                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div>

            </div>
        </div>
    );
};

export default Cart;