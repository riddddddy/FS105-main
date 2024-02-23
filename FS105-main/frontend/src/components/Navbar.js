import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { allData } from "../context/AppContext.js";
import Cookies from "js-cookie";
import Upload from "../pages/Upload.js";

function Navbar() {
  const { user, setUser } = useContext(allData);
  const [logout, setLogout] = useState(false);

  const logoutHandler = () => {
    setLogout(true);
  };

  const closeModal = async () => {
    setLogout(false);
    window.location.href = "/";
    localStorage.removeItem("user");

    const response = await fetch("/api/users/logout");
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="navbar py-0">
      <div className="navbar-start">
        {/* dropdown navbar for user */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="text-gray-500 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>

            {/* dropdown navbar for user (END) */}
          </ul>
        </div>
        {/* LOGO  */}
        <div className="flex">
          <Link to="/" className="">
            <img
              width={100}
              src="/logo/Cream_Brown_Simple_Creative_Bag_Logo_1.gif1_1.gif"
              alt="logo_luxuria"
            />
          </Link>
        </div>
        {/* LOGO  (END) */}
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="navbar">
          <li className="px-5 transition duration-150 border-b-2 border-transparent hover:border-black">
            <Link to="/">Home</Link>
          </li>
          <li className="px-5 transition duration-150 border-b-2 border-transparent hover:border-black">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="px-5 transition duration-150 border-b-2 border-transparent hover:border-black">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-5 transition duration-150 border-b-2 border-transparent hover:border-black">
            <Link to="/products">Products</Link>
          </li>
          <li className="px-5 transition duration-150 border-b-2 border-transparent hover:border-black">
            <Link to="/faqs">FAQs</Link>
          </li>
          {/* <li>
            <Link to={user?.user.role === 'admin' ? '/upload' : '/'}>Upload Admin</Link>
          </li> */}
        </ul>
      </div>
      {/* account menu */}
      <div className="navbar-end">
        <div>
          <div className="dropdown dropdown-bottom dropdown-end">
            {!user && (
              <Link to="/login">
                <button className="px-5 transition duration-150 border-b-2 border-transparent hover:border-black">
                  Login
                </button>
              </Link>
            )}
            {/* User dropdown menu */}
            {user && (
              <div tabIndex={0} role="button" className="btn m-1">
                {user?.user.firstName}
                <div className="ms-1 avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span className="text-xs">
                      {user?.user.firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {user && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>Hi, {user?.user.firstName}!</li>
                {user?.user.role === "user" && (
                  <div>
                    <li>
                      <button className="btn btn-ghost text-gray-500 pt-4">
                        <Link to="/cart">My Cart</Link>
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-ghost text-gray-500 pt-4">
                        <Link to="/wishlist">My Wishlist</Link>
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-ghost text-gray-500 pt-4">
                        <Link to="/userdetails">My Account</Link>
                      </button>
                    </li>
                  </div>
                )}

                {/* Admin dropdown menu */}
                {user?.user.role === "admin" && (
                  <div>
                    <li>
                      <button className="btn btn-ghost text-gray-500 pt-4">
                        <Link to="/cart">My Cart</Link>
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-ghost text-gray-500 pt-4">
                        <Link to={user?.user.role === "admin" ? "/admin" : "/"}>
                          Admin Page
                        </Link>
                      </button>
                    </li>
                  </div>
                )}
                {/* Admin dropdown menu (END) */}
                <li>
                  {user ? (
                    <button
                      onClick={logoutHandler}
                      className="btn btn-ghost text-gray-500 pt-4"
                    >
                      <Link to="">Logout</Link>
                    </button>
                  ) : (
                    <button className="btn btn-ghost text-gray-500">
                      <Link to="/login">Login</Link>
                    </button>
                  )}
                </li>
                {/* User dropdown menu (END)*/}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* account menu (END)*/}
      {/* logout handling */}
      {logout && (
        <div className="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
          <div className="mx-auto min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 fill-emerald-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    See you, {user?.user.firstName}!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Thank you for shopping with us! You have successfully log
                      out.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={closeModal}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* logout handling end */}
    </div>
  );
}

export default Navbar;
