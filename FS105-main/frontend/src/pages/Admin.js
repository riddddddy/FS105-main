import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allData } from '../context/AppContext.js'


const Admin = () => {

  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("dashboard")

  
  const clickHandler = (e, tabId) => {
    console.log(e.target.id)
    setActiveTab(tabId)
  }

  const [logout, setLogout] = useState(false)


  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")

  const [success, setSuccess] = useState(false)



  const closeModalLogout = () => {
    setLogout(false)

    localStorage.removeItem('user');
    window.location.href = "/";
  }


  const logoutHandler = () => {

    // localStorage.removeItem('user');
    // window.location.href = "/";
    setLogout(true)
  }


  const { user } = useContext(allData)
  console.log(user);

  // State variables for user data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);
  

  useEffect(() => {
      // Fetch user data from the backend when the component mounts
      fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
        const response = await fetch(`/api/users`);
        const data = await response.json(); // Parse the response body as JSON
        setUsers(data); // Set the users state with the parsed JSON data
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
}

const deleteUser = async (user_id) => {
  try {
    await fetch(`/api/users/${user_id}`, {
      method: 'DELETE',
    });
    // Remove the deleted user from the state
    setUsers(users.filter(user => user._id !== user_id));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

  const saveHandler = async (e) => {
    e.preventDefault()
    console.log(user?.user._id)

    const data = {
      firstName: firstName || user?.user.firstName,
      lastName: lastName || user?.user.lastName,
      email: email || user?.user.email,
      province: province || user?.user.province,
      city: city || user?.user.city,
      password: password || user?.user.password,
      password1: password1 || user?.user.password1,
      address: address || user?.user.address,
      postalCode: postalCode || user?.user.postalCode,
    }

    const response = await fetch(`api/users/update/${user?.user._id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },


    })

    const json = await response.json()
    console.log(json)


    if (!response.ok) {
      console.log(json.error, "whats wring?")
    }

    if (response.ok) {

      setFirstName("")
      setLastName("")
      setAddress("")
      setCity("")
      setProvince("")
      setPostalCode("")
      setEmail("")
      setPassword("")
      setPassword1("")
      console.log("it is working fine here", json)
      setSuccess(true)

    }

  }


  const closeModal = () => {
    setSuccess(false)
  }

  const [subscribes, setSubscribes] = useState([]);

  useEffect(() => {
    
      fetchSubscribes();
  }, []);

  const fetchSubscribes = async () => {
    try {
      const response = await fetch(`/api/subscribe`);
      const data = await response.json();
      setSubscribes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="pb-24 mt-16">
        <div className="container">
          <div id="shoptab" className="grid grid-cols-12 gap-y-5 lg:gap-y-0 gap-x-5">
            <div className="col-span-12 lg:col-span-4">
              <ul className="shop-tab-nav account-nav flex flex-wrap flex-col">
                <li onClick={e => clickHandler(e, "dashboard")} className={activeTab === 'dashboard' ? "bg-black text-white" : ''}><a className="font-medium uppercase py-4 px-5 border border-black border-b-0 block hover:cursor-pointer" id='dashboard'>dashboard</a></li>
                {/* <li onClick={e => clickHandler(e, "orders")} className={activeTab === 'orders' ? "active" : ''}><a className="font-medium py-4 px-5 leading-none uppercase transition-all hover:text-white hover:bg-orange text-base border-t border-l border-r border-gray-600 block" id='orders'>orders</a></li> */}
                <li onClick={e => clickHandler(e, "address")} className={activeTab === 'address' ? "bg-black text-white" : ''}><a className="font-medium uppercase py-4 px-5 border border-black border-b-0 block" id='address'>address</a></li>
                <li onClick={e => clickHandler(e, "details")} className={activeTab === 'details' ? "bg-black text-white" : ''}><a className="font-medium uppercase py-4 px-5 border border-black border-b-0 block" id='account'> Account Details</a></li>
                <li onClick={e => clickHandler(e, "upload", navigate("/upload"))} className={activeTab === 'upload' ? "bg-black text-white" : ''}><a className="font-medium uppercase py-4 px-5 border border-black block" id='account'>Upload Product</a></li>
                <li onClick={(e) => clickHandler(e, "users")} className={activeTab === 'users' ? "bg-black text-white" : ''}><a className="font-medium uppercase py-4 px-5 border border-black block hover:cursor-pointer" id='users'> User Management</a></li>
                <li onClick={(e) => clickHandler(e, "subscribers")} className={activeTab === 'subscribers' ? "bg-black text-white" : ''}><a className="font-medium uppercase py-4 px-5 border border-black block hover:cursor-pointer" id='users'> Subscribers</a></li>

                <li><a className="mt-5 btn btn-primary mb-8" onClick={logoutHandler}>Logout</a></li>
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div>

                {
                  activeTab === "dashboard" &&
                  <div id="dashboard1" className="shop-tab-content">
                    <div className="p-8 border border-gray-600">
                      <h3 className="font-semibold text-md lg:text-lg capitalize pb-5 mb-5 border-b border-gray-600 leading-none">Dashboard</h3>
                      <p>
                        Hello, <strong>{user?.user.firstName}</strong> !
                      </p>
                      <p>
                        From your account dashboard, you can easily check &amp; view
                        your recent orders, manage your shipping and billing addresses
                        and edit your password and account details.
                      </p>
                    </div>
                  </div>
                }

                {/* { activeTab === "orders" && 
                <div id="orders1" className="shop-tab-content">
                    <div className="p-8 border border-gray-600">
                      <h3 className="font-semibold text-md lg:text-lg capitalize pb-5 mb-5 border-b border-gray-600 leading-none">Orders</h3>

                      <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                          <thead>
                            <tr>
                              <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">No</th>
                              <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Name</th>
                              <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Date</th>
                              <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Status</th>
                              <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Total</th>
                              <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">1</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">Mostarizing Oil</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">Aug 22, 2018</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">Pending</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">$45</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">
                                <a href="shopping-cart.html" className="ht-btn black-btn">View</a>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">2</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">Katopeno Altuni</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">July 22, 2018</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">Approved</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">$100</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">
                                <a href="shopping-cart.html" className="ht-btn black-btn">View</a>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">3</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">Murikhete Paris</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">June 12, 2017</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">On Hold</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">$99</td>
                              <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">
                                <a href="shopping-cart.html" className="ht-btn black-btn">View</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>

                    </div>
                  </div>
                } */}

                {activeTab === "address" &&
                  <div id="address1" className="shop-tab-content">

                    <div className="p-8 border border-gray-600">
                      <h3 className="font-semibold text-md lg:text-lg capitalize pb-5 mb-5 border-b border-gray-600 leading-none">Billing Address</h3>

                      <address className="not-italic">
                        <p><strong>{user?.user.firstName}</strong></p>
                        <p>
                          {user?.user.address} <br />
                          {user?.user.city} {user?.user.province} <br />
                          {user?.user.postalCode}
                        </p>
                      </address>
                    </div>
                  </div>
                }

                {activeTab === "details" &&
                  <div id="account1" className="shop-tab-content">
                    <div className="p-8 border border-gray-600">
                      <h3 className="font-semibold text-md lg:text-lg capitalize pb-5 mb-5 border-b border-gray-600 leading-none">Account Details</h3>
                      <form action="#">
                        <div className="grid grid-cols-12 gap-x-5">
                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setFirstName(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={firstName} id="first-name" placeholder="First Name" type="text" />
                          </div>

                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setLastName(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={lastName} id="last-name" placeholder="Last Name" type="text" />
                          </div>

                          <div className="col-span-12 mb-5">
                            <input onChange={e => setEmail(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={email} id="email" placeholder="Email Address" type="text" />
                          </div>


                          <div className="col-span-12 mb-5">
                            <h4 className="font-semibold text-base capitalize">Address change</h4>
                          </div>

                          <div className="col-span-12 mb-5">
                            <input onChange={e => setAddress(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={address} id="address" placeholder="Address" type="text" />
                          </div>

                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setCity(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={city} id="city" placeholder="City" type="text" />
                          </div>

                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setPostalCode(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={postalCode} id="postalCode" placeholder="Postal Code" type="text" />
                          </div>

                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setProvince(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" value={province} id="province" placeholder="Province" type="text" />
                          </div>






                          <div className="col-span-12 mb-5">
                            <h4 className="font-semibold text-base capitalize">Password change</h4>
                          </div>

                          {/* <div className="col-span-12 mb-5">
        <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" id="current-pwd" placeholder="Current Password" type="password" />
      </div> */}

                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setPassword(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" id="password" value={password} placeholder="New Password" type="password" />
                          </div>

                          <div className="col-span-12 lg:col-span-6 mb-5">
                            <input onChange={e => setPassword1(e.currentTarget.value)} className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" id="password1" value={password1} placeholder="Confirm Password" type="password" />
                          </div>

                          <div className="col-span-12">
                            <button onClick={saveHandler} className="btn btn-primary">Save Changes</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                }

                <div>
      {activeTab === 'subscribers' && (
        <div id="subscribers1" className="shop-tab-content">
          <div className="p-8 border border-gray-600">
            <h3 className="font-semibold text-md lg:text-lg capitalize pb-5 mb-5 border-b border-gray-600 leading-none">
              Subscribers
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr>
                    <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Email</th>
                    {/* Add more table headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {subscribes.map((subscribe, index) => (
                    <tr key={index}>
                      <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">{subscribe.email}</td>
                      {/* Render additional subscriber data as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>

    {activeTab === "users" && (
    // Render User Management Table
    <div id="users1" className="shop-tab-content">
        <div className="p-8 border border-gray-600">
            <h3 className="font-semibold text-md lg:text-lg capitalize pb-5 mb-5 border-b border-gray-600 leading-none">User Management</h3>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead>
                        <tr>
                            <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">First Name</th>
                            <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Last Name</th>
                            <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base">Email</th>
                            <th className="bg-gray-light text-center border border-solid border-gray-600 p-3 font-semibold text-base ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id}>
                                <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">{user.firstName}</td>
                                <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">{user.lastName}</td>
                                <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">{user.email}</td>
                                <td className="text-center border border-solid border-gray-600 py-5 px-3 align-middle">
                                <div className="flex justify-between">
                                <button className="btn btn-warning">
                                        <Link to={`/update/${user._id}`}>Update</Link>
                                </button>
                                <button onClick={() => deleteUser(user._id)} className="btn btn-error">
                                        Delete
                                </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                             ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {success && <div className="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
        <div className="mx-auto min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6 fill-emerald-800">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>

              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Hello, {user?.user.firstName}!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You have succesfully update your account.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={closeModal}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>}


      {logout && <div className="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
        <div className="mx-auto min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-none px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6 fill-emerald-800">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>

              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  See you, {user?.user.firstName}!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Thank you for shopping with us! You have successfully log out.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button onClick={closeModalLogout}
                className="inline-flex justify-center w-full rounded-none border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Admin