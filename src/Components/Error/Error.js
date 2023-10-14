import React from 'react';
import { Link } from 'react-router-dom';

const ERROR = () => {
    return (
        <div className=' flex flex-col justify-center m-12 items-center dark:text-white '>
            <h2 className='font-bold my-1 xl:text-4xl'>PAGE UNAVAILABLE</h2>
            <p className='xl:w-1/3 w-[80%] font-normal my-1 text-sm xl:text-base'>The page you are looking for is temporarily unavailable.</p>

            <Link to='/'
                // Button to Home Page
                className='my-3 text-lg text-white bg-gradient-to-br from-purple-600 to-blue-500 
                hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
                dark:focus:ring-blue-800 font-medium rounded-full px-7 py-2.5 text-center mr-2 mb-10'>
                Home
            </Link>

        </div>
    )
}

export default ERROR
