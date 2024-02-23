import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
    return (

        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="">
                    <div className="container mb-20">
                        <div className="grid grid-cols-12 gap-x-5">
                            <div className="md:col-start-4 md:col-span-6 col-span-12 text-center mx-auto">
                                <h2 className="font-medium text-lg">Ooops! Error 404</h2>
                                <p className="mb-10">Sorry, this page does not exist or is temporarily unavailable.</p>
                                    <button className='btn btn-primary'><Link to="/">Back to Home Page</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Error