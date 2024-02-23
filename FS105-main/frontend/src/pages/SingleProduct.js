import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { allData } from "../context/AppContext";

const SingleProduct = () => {

  const { bagName } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState()  
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)
  const [cartError, setCartError] = useState("")

  const { wishlist, setWishlist, cartItems, setCartItems } = useContext(allData)

  const getSingleProduct = async (req, res) => {
    setLoading(true)

    try {
      const product = await fetch(`/api/products/${bagName}`)
      const json = await product.json()

      console.log(json)
      setProduct(json)

      setLoading(false)

    } catch (error) {

      console.log(error)
    }
  }


  useEffect(() => {
    getSingleProduct()
  }, [bagName])

  //   heart for wishlist 
  const heart = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-red-700 hover:stroke-red-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>

  const { user } = useContext(allData)
  console.log(user?.user._id)

 


  const wishListHandler = async () => {
    console.log(product)

    const isProductInWishlist = wishlist.find(item => item.bagName === product.bagName && user?.user._id === item?.user_id);

    if (isProductInWishlist) {
      setMessage("Selected product is already in the wishlist!")
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
        setSuccess(false)
      }, 3000)
      return console.log("Selected product is already in the wishlist")
    }

    const data = {
      user_id: user?.user._id,
      image: product.image,
      price: product.price,
      description: product.description,
      bagName: product.bagName
    }

    const response = await fetch(`/api/wishlist/addwishlist/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    })

    const json = await response.json()
    console.log(json)
    setWishlist([...wishlist, data])
    // setWishlist(prevWishlist => [...prevWishlist, data]); 


    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log(json)
      setSuccess(true)
      setMessage("Product is added into wishlist!")

      setTimeout(() => {
        setSuccess(false)
      }, 3000)


    }


  }

  const handleAddToCart = async () => {
    console.log(product.bagName)

    if(!user){
      console.log("Please log in before add to cart")
      setCartError("Please log in before add to cart")
    }

    // const duplicateItem = cartItems.find(item=>{
    //   if(item.bagName === product.bagName){
    //     return true
    //   } else {
    //     return false
    //   }
    // })

    // if(duplicateItem){
    //   return console.log("it is already in the bag")
    // }

    const duplicateIteminCart = cartItems.find(item => {
      return item.bagName === product.bagName;
    });

    if(duplicateIteminCart){
      setMessage("It is already in the cart")
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
      return
    }

    const data = {
      user_id: user?.user._id,
      bagName: product.bagName,
      description: product.description,
      image: product.image,
      price: product.price,
      quantity: 1
    }

    const response = await fetch('/api/cart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    })

    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    }

    if (response.ok) {
      console.log(json)
      setMessage("Item has been added to cart")
      setSuccess(true)
      setCartItems([...cartItems, data])

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }

  }







  if (loading) {
    return (
      <CircleLoader
        cssOverride={{
          margin: "auto",
          marginTop: "200px",
          marginBottom: "200px",
        }}
        size={100}
      />
    );
  }


  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <div className="container">
        <Link to="/products">
          <button className="btn mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>
        </Link>
      </div>

      {product && (
        <div>
          <div className="py-24">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                <div>
                  <div className="relative overflow-hidden">
                    <div className="gallery mb-6">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <img
                              src={`http://localhost:5000/Images/${product.image}`}
                              alt={product.bagName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg  mb-5 ">
                    {product.bagName}
                  </h3>
                  <h5 className="font-bold text-md leading-none text-red-700 mb-5">
                    ${product.price}
                  </h5>
                  {/* <div className="mb-3"> 
                    <span>Availability:</span>{" "} 
                    <span className="font-semibold"> 
                      {product.numberOfStocks} left in stock 
                    </span> 
                  </div>  */}
                  <p className="mb-10">{product.description}</p>



                  <div>
                    <div className="mb-8">
                      <div className="flex flex-wrap items-center mt-8 gap-8">
                        <div className="ml-0 sm:">
                          <button onClick={handleAddToCart} className="btn btn-primary">
                            Add to Cart
                          </button>
                        </div>
                        <Link to={`/reviews/${product.bagName}`}>
                          <button className="btn btn-primary">
                            Reviews
                          </button>
                        </Link>

                        <Link
                          onClick={wishListHandler}
                          className="text-md"
                        >
                          {heart}
                        </Link>


                      </div>
                      <div className="text-red-500 mt-3">{cartError}</div>


                    </div>
                  </div>

                  {/* toastbox */}
                  <div className="toast toast-end">
                    {/* <div className="alert alert-info">
                      <span>New mail arrived.</span>
                    </div> */}

                    {success && <div className="alert alert-success">

                      <span className="text text-xl text-wrap">Hello {user?.user.firstName}. {message}</span>
                    </div>}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;


