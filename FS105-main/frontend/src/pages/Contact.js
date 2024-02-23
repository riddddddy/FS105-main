import React, { useContext, useState } from 'react';
import { allData } from '../context/AppContext.js';
import axios from 'axios';
import contact from "../images/contact/contact.jpg";

const Contact = () => {
  const {
    enquirerName,
    setEnquirerName,
    enquirerEmail,
    setEnquirerEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isMobile,
    user
  } = useContext(allData);

  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  console.log(enquirerName, enquirerEmail, subject, message)

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("it is working");

    const response = await fetch('/api/messages/submitmessage', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enquirerEmail, enquirerName, subject, message })
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setErrorMessage(json.error)
    }

    if (response.ok) {
      console.log("it is in the database");
      setEnquirerEmail(" ");
      setEnquirerName(" ");
      setSubject(" ");
      setMessage(" ");
      setSuccess(true)
      setErrorMessage("")
    }


  };

  const closeModal = () => {
    setSuccess(false)
  }

  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubscription = async (e) => {
    e.preventDefault();
    console.log("Attempting to subscribe with email:", email);
    // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setModalMessage('Please enter a valid email address.');
    return;
  }

  // Check if the email has the correct domain
  if (!email.endsWith('@gmail.com')) {
    setModalMessage('Please enter a Gmail address.');
    return;
  }

    try {
      const response = await axios.post('/api/subscribe', { email });

      const responseData = response.data;
    console.log(responseData);
    
    if (responseData.message) {
      setModalMessage(responseData.message);
    } else if (responseData.error) {
      setModalMessage(responseData.error);
    }
  } catch (error) {
    console.log('Subscription failed:', error.message);
    setModalMessage('Failed to subscribe. Please try again later.');
  }
  
};
const closeModalAndResetEmail = () => {
  setModalMessage('');
  setEmail('');
  console.log(email)
};

  return (
    <>
      <div className="bg-white py-24">
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="contact-info-area">
              <h2 className="font-medium text-2xl sm:text-4xl mb-5">CONTACT US</h2>
              <div className="flex flex-wrap items-center mb-5">
                <span className="text-dark text-2xl sm:text-4xl mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <p className="flex-1">2 Orchard Link, SCAPE #05 - 08 Near Somerset MRT, Singapore 237978</p>
              </div>
              <div className="flex flex-wrap items-center mb-5">
                <span className="text-dark text-4xl mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <a href="mailto:info@example.com" className="flex-1"> luxurialoom@gmail.com </a>
              </div>
              <div className="flex flex-wrap items-center mb-8">
                <span className="text-dark text-4xl mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <a href="tel:01234567890" className="flex-1">+65 1234 5678</a>
              </div>
              <div className="mt-10 artboard artboard-horizontal">
                <img src={contact} alt="ContactPic" className="w-full h-auto" />
              </div>
            </div>

            <div className="card bg-base-100">
              <form className="card-body p-8 sm:p-14">
                <div className="form-control">
                  <label className="label">
                    <span>Name</span>
                  </label>
                  <input
                    onChange={(e) => setEnquirerName(e.currentTarget.value)}
                    className="input w-full input-bordered"
                    type="text"
                    name="name"
                    value={enquirerName}
                  />

                  <label className="label">
                    <span>Email</span>
                  </label>
                  <input
                    onChange={(e) => setEnquirerEmail(e.currentTarget.value)}
                    className="input w-full input-bordered"
                    type="email"
                    name="email"
                    value={enquirerEmail}
                    
                  />

                  <label className="label">
                    <span>Subject</span>
                  </label>
                  <input
                    onChange={(e) => setSubject(e.currentTarget.value)}
                    className="input w-full input-bordered"
                    type="text"
                    name="subject"
                    value={subject}
                  />

                  <label className="label">
                    <span>Message</span>
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    className="input input-bordered w-full py-1 px-5 mb-5 h-32 text-base resize-none"
                    name="message"
                    value={message}
                  ></textarea>

                  <div className='text-red-500'>
                    {errorMessage && errorMessage}
                  </div>

                  <div className="form-control mt-6">
                    <button
                      className="btn btn-primary text-white rounded-none"
                      onClick={submitHandler}
                      type="submit"
                    >
                      Send Message
                    </button>
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
                                You have succesfully sent a message. We will get back to you as soon as possible.
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

                </div>
              </form>
            </div>


          </div>
        </div>




      </div>

      <div className='container lg:w-2/4 flex justify-center mb-20'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7899666052795!2d103.83293041076051!3d1.3008932617253237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1996d80bf041%3A0x65962d763fdc49db!2sMAGES%20Institute%20of%20Excellence!5e0!3m2!1sen!2ssg!4v1706333068895!5m2!1sen!2ssg"
          width={isMobile <= 768 ? "100%" : "60%"}
          height="450"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>


      <div className='flex justify-center mb-20 grid grid-cols-1"'>
        <h6 className="footer-title text-center mb-10">Newsletter</h6>
        <div className='w-full px-4 md:px-0  md:w-96 italic text-center'>
          <p className='mb-5'>We believe in using our platform for good. Partner with us to support artisan communities and sustainability initiatives around the world.</p>
          <p>Crave exclusive offers, insider trends, and early access to new collections? Subscribe to the LuxuriaLoom Club and indulge in a world of premium perks. Be the first to snag limited-edition bags, score VIP discounts, and get expert styling tips delivered straight to your inbox. Shine brighter, shop smarter, subscribe now!</p>
        </div>

        <form onSubmit={handleSubscription} className='mx-auto w-full md:px-0 px-4 sm:w-80 mt-10'> 
          <fieldset className="form-control"> 
            <label className="label"> 
              <span className="label-text">Enter your email address</span> 
            </label> 
            <div className="join w-full"> 
              <input type="email" placeholder="username@site.com"  value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full input-bordered join-item" /> 
              <button className="btn btn-primary join-item text-white no-animation">Subscribe</button> 
            </div> 
          </fieldset> 
        </form>
      {/* You can render modals based on the `modalMessage` state */}
      {modalMessage && (
  <div className="fixed z-10 inset-0 overflow-y-auto" id="subscription-modal">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 stroke-blue-800">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Subscription Status
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {modalMessage}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
        <button onClick={closeModalAndResetEmail} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
  OK
</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
    </>
    )
    };
  



export default Contact;