import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allData } from '../context/AppContext.js';

const UpdateUser = () => {
  const { user_id } = useParams(); // Get the user ID from the URL params
   const { user } = useContext(allData); 
  
  // Initialize user state with default values
  
    const [modalMessage, setModalMessage] = useState('');
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [ userAccount, setUserAccount] = useState({
    
  });

  useEffect(() => {
    fetchUserDetails();
  }, []); // Add user_id as a dependency to fetch details when it changes
   console.log(user_id);

  // Fetch user details function
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/users/${user_id}`);
      const userData = await response.json();
      console.log(userData);
      setUserAccount(userData); // Set the state with the fetched user data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  console.log(userAccount);

  // Render loading state if user data is being fetched
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a PATCH request to update the user details
      const data = {
        firstName: firstName || userAccount[0]?.firstName,
        lastName: lastName || userAccount[0]?.lastName,
        email: email || userAccount[0]?.email,
        province: province || userAccount[0]?.province,
        city: city || userAccount[0]?.city,
        address: address || userAccount[0]?.address,
        postalCode: postalCode || userAccount[0]?.postalCode,
    }

      const response = await fetch(`/api/users/update/${user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        
      });
      if (response.ok) {
        setModalMessage('User updated successfully');
      } else {
        setModalMessage('Failed to update user');
      }
      } catch (error) {
        console.error('Error updating user:', error);
      }
  };

  return (
    <div className="container mx-auto w-9/12 mt-20 p-8 border border-gray-600">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input onChange={e => setFirstName(e.currentTarget.value)}
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder={userAccount[0]?.firstName}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input onChange={e => setLastName(e.currentTarget.value)}
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder={userAccount[0]?.lastName}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={e => setEmail(e.currentTarget.value)}
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder={userAccount[0]?.email}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input onChange={e => setAddress(e.currentTarget.value)}
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder={userAccount[0]?.address}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input onChange={e => setCity(e.currentTarget.value)}
              type="text"
              id="city"
              name="city"
              value={city}
              placeholder={userAccount[0]?.city}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input onChange={e => setPostalCode(e.currentTarget.value)}
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              placeholder={userAccount[0]?.postalCode}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <input onChange={e => setProvince(e.currentTarget.value)}
              type="text"
              id="province"
              name="province"
              value={province}
              placeholder={userAccount[0]?.province}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          
        </div>
        <button type="submit" className="mt-4 btn btn-warning">Update User</button>
      </form>
    
      {modalMessage && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border border-gray-600 p-4 flex flex-col items-center">
      <p className="text-xl font-semibold mb-4">{modalMessage}</p>
      <Link to="/admin">
        <button className="btn btn-warning">Ok</button>
      </Link>
     </div>
    </div>
    )}
    </div>
  );
};

export default UpdateUser;

