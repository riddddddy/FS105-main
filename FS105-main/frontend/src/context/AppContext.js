import React, { createContext, useState, useEffect } from "react";

const allData = createContext()


const AppContext = ({ children }) => {

  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [user, setUser] = useState()
  const [shouldFetch, setShouldFetch] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth);

  // for bags

  const [bagName, setBagName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [numberOfStocks, setNumberOfStocks] = useState("")


  // for message contact us page

  const [enquirerName, setEnquirerName] = useState("")
  const [enquirerEmail, setEnquirerEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")


  //for FAQs

  const FAQsArray = [
    {
      question: "What is your return/exchange policy?",
      answer: "Ensure that the condition is good as new and return to us via post. Contact us for more details."
    },

    {
      question: "Is it safe to shop on your website?",
      answer: "Yes, shopping on our website is completely safe. We use industry-standard encryption technology to protect your personal information and ensure secure transactions."
    },

    {
      question: "How can I track my order?",
      answer: "After your order is shipped, you will receive a tracking number via email. You can use this number to track the status and estimated delivery date of your package."
    },

    {
      question: "How much does shipping cost?",
      answer: "Shipping costs depend on factors such as the destination and selected shipping method. You can view the shipping costs during the checkout process before finalizing your order."
    },

    {
      question: "How do I place an order?",
      answer: "Placing an order is easy! Simply browse our website, add the desired items to your cart, and follow the checkout process. Make sure to provide accurate shipping information for a smooth delivery experience."
    },

    {
      question: "What should I do if I receive a damaged or defective item?",
      answer: "We apologize for any inconvenience. Please contact our customer support team within 7 days of receiving the item. Provide photos of the damaged or defective product, and we will arrange for a replacement or refund."
    },

    {
      question: "Are there any promotions or discounts available?",
      answer: `Yes, we frequently run promotions and offer discounts on select products. Stay updated by subscribing to our newsletter or checking our "Promotions" page for the latest deals and discounts.`
    },

    {
      question: "Do you offer gift wrapping or personalized messages?",
      answer: "Yes, we offer gift wrapping services at an additional cost. During the checkout process, you can select the gift wrapping option and include a personalized message for your recipient."
    }

  ]


  // wishlist

  const  [wishlist, setWishlist] = useState([])


   //localstorage data
   useEffect(() => {

    if (shouldFetch) {
      const userLogin = JSON.parse(localStorage.getItem('user')) || null
      console.log(userLogin)
      setUser(userLogin)
      setShouldFetch(false)
    }


  }, [shouldFetch])

  console.log(user)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const AnimateTextVariants = {
    offscreen: { y: "100%", opacity: 0 },
    onscreen: { y: "0%", opacity: 1 }
  }
  
  const AnimateCard = {
    offscreen: { y: "100%", opacity: 0 },
    onscreen: { y: "0%", opacity: 1 }
  }
  

  const AnimateZoomVariant = {
    offscreen: {
      scale: 0,
    },
    onscreen: {
      scale: 1,
    }
  }
  

  // for Cart
  const [cartItems, setCartItems] = useState([]);

  return (

    <allData.Provider value={{wishlist, setWishlist, shouldFetch,setShouldFetch, user, setUser, password, setPassword, password1, setPassword1, email, setEmail, firstName, setFirstName, lastName, setLastName, address, setAddress, city, setCity, province, setProvince, postalCode, setPostalCode, bagName, setBagName, price, setPrice, description, setDescription, numberOfStocks, setNumberOfStocks, enquirerEmail, setEnquirerEmail, enquirerName, setEnquirerName, subject, setSubject, message, setMessage, FAQsArray, cartItems, setCartItems, isMobile, AnimateCard, AnimateTextVariants, AnimateZoomVariant }}>
      {children}
    </allData.Provider>
  )
}

export { AppContext, allData } 