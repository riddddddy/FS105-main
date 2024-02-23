import React, { useState } from 'react';
import axios from 'axios';
import forgotpassword from "../images/forgotPassword/forgotpassword.jpg"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/forgot-password', { email });
      setMessage(response.data.message);
      // Handle success
    } catch (error) {
      setMessage(error.response.data.error);
      // Handle error
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${forgotpassword})`, minHeight: '100vh' }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        </div>
        <div className="card w-full max-w-lg  bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control text-center">
              <label className='mb-5 text-4xl' htmlFor="email">Forgot Passsword?</label>
              <p className='mb-5'>No problem!</p>
              <p className='mb-10'>Enter the email address associated with your account, and we will send you a link to 
              reset your password. If you don't see an email from us, please check your spam folder or contact
              support for assistance.</p>
              <input
                type="email"
                placeholder="email"
                id="email"
                value={email}
                className="input input-bordered"                
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Reset Password</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;