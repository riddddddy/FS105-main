import React from 'react'
import { useContext, useState } from 'react'
import { AppContext, allData } from '../context/AppContext.js'
import {Link} from 'react-router-dom';

const Register = () => {

    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const { firstName, setFirstName, lastName, setLastName, address, setAddress, city, setCity, province, setProvince, postalCode, setPostalCode, email, setEmail, password, setPassword, password1, setPassword1 } = useContext(allData)

    // console.log(firstName, lastName, address, city, province, postalCode, email, password, password1)

    const registerButton = async (e) => {
        e.preventDefault()

        console.log("it is working")

        const response = await fetch('/api/users/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, address, city, province, postalCode, email, password, password1 })
        })

        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            console.log(json.error)
            setError(json.error)
            setFirstName(firstName)
            setLastName(lastName)
            setAddress(address)
            setCity(city)
            setProvince(province)
            setPostalCode(postalCode)
            setEmail(email)
            setPassword(password)
            setPassword1(password1)
            setSuccess(false)
        }

        if (response.ok) {
            console.log("it is working fine")

            setFirstName("")
            setLastName("")
            setAddress("")
            setCity("")
            setProvince("")
            setPostalCode("")
            setEmail("")
            setPassword("")
            setPassword1("")
            setSuccess(true)
            setSuccessMessage("Successfully registered!")
        }

        // setFirstName("")
        // setLastName("")
        // setAddress("")
        // setCity("")
        // setProvince("")
        // setPostalCode("")
        // setEmail("")
        // setPassword("")
        // setPassword1("")
    }

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://cdn.discordapp.com/attachments/1199688598123978762/1207549896618541056/tamara-bellis-IwVRO3TLjLc-unsplash.jpg?ex=65e00d7a&is=65cd987a&hm=aa3935250fa45e48cf8bd36d86b5fbcf0b1b1e7bc924ceba11414c4c244621e5&)'}}>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 rounded-none ">
              <form className='card-body'>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
        
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-content">
                            First name
                            </label>
                            <input
                            onChange={(e) => setFirstName(e.currentTarget.value)}
                            value={firstName}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-content">
                            Last name
                            </label>
                            <input
                            onChange={(e) => setLastName(e.currentTarget.value)}
                            value={lastName}
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-content">
                            Street address
                            </label>
                            <input
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            value={address}
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-content">
                            City
                            </label>
                            <input
                            onChange={(e) => setCity(e.currentTarget.value)}
                            value={city}
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level2"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-content">
                            State / Province
                            </label>
                            <input
                            onChange={(e) => setProvince(e.currentTarget.value)}
                            value={province}
                            type="text"
                            name="region"
                            id="region"
                            autoComplete="address-level1"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-content">
                            ZIP / Postal code
                            </label>
                            <input
                            onChange={(e) => setPostalCode(e.currentTarget.value)}
                            value={postalCode}
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="form-control">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-content">
                            Email address
                            </label>
                            <input
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            value={email}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-content">
                            Password
                            </label>
                            <input
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            value={password}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
            
                        <div className="form-control">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-content">
                            Confirm Password
                            </label>
                            <input
                            onChange={(e) => setPassword1(e.currentTarget.value)}
                            value={password1}
                            id="password1"
                            name="password1"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full h-10 input input-bordered text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
        
                    <div className='flex items-center justify-center flex-col mt-5'>
                    {success ? '' : <button onClick={registerButton} className="btn btn-primary mb-2 text-white no-animation rounded-none">Register</button>}
                    <div className={success ? 'mt-2 text-green-600' : 'mt-2 text-red-600'}>
                        {success ? successMessage : error}
                    </div>
                    {success && <Link to='/login'><button className='mt-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Back to Login</button></Link>}
                    </div>
              </form>
            </div>
          </div>
        </div>
      );
      
         
      
}

export default Register