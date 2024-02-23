import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { allData } from '../context/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'


const Wishlist = () => {

  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
  </svg>


  const navigate = useNavigate()




  const { user, wishlist, setWishlist } = useContext(allData)
  // console.log(user?.user._id)

  const [shouldFetch, setShouldFetch] = useState(false)

  useEffect(() => {
    const fetchWishlist = async () => {
      // const response = await fetch(`/api/wishlist?id=${user?.user._id}`, //this is using req.query. Below code is req.params
      const response = await fetch(`/api/wishlist/${user?.user._id}`,

        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      const data = await response.json()
      console.log(data)
      setWishlist(data)
    }

    fetchWishlist()
    setShouldFetch(false)
  }, [shouldFetch])

  console.log(wishlist)

  // //to make sure no duplicate data is in the array
  // const unqiueWishlist = new Map()

  // wishlist.forEach(item => {
  //   return unqiueWishlist.set(item.bagName, item)
  // })

  // const uniqueArray = Array.from(new Set(unqiueWishlist.values()))

  // console.log(uniqueArray)



  const deleteButton = async (e) => {

    console.log(e.currentTarget)

    const response = await fetch(`/api/wishlist/${e.currentTarget.id}`, {
      method: "DELETE",

    })

    const data = await response.json()
    console.log(data)
    console.log(wishlist)


    setShouldFetch(true)

  }


  const empty = wishlist.length === 0


  return (
    <div className='container'>

      <div className='text-center text-2xl underline underline-offset-8 mt-10 mb-20'>
        My Wishlist
      </div>

      {empty && <div className='mt-5 text-center'>No saved item in wishlist:(</div>}

      <div className='grid grid-cols-1 gap-10 place-items-center sm:grid-cols-2 md:grid-cols-3'>
        {wishlist.map(item => (
          <div key={item?._id} className="card bg-base-100 outline outline-1 outline-slate-200">
            <figure className="px-10 pt-10">
              <img src={`http://localhost:5000/Images/${item?.image}`} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item?.bagName}</h2>
              <p>$ {item?.price}</p>
              <div className="card-actions">
                <button onClick={() => { navigate(`/products/product/${item.bagName}`) }} className="btn btn-primary">Buy Now</button>
              </div>
            </div>
            <span id={item._id} name={item?.bagName} className='absolute right-0 hover:cursor-pointer mt-5 mr-5' onClick={deleteButton}>{close}</span>
          </div>

        ))}
      </div>

    </div>
  )
}

export default Wishlist