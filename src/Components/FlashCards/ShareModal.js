import React from 'react';
import { BsWhatsapp, BsLinkedin } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShareModel = ({ visible, onClose }) => {

    //  Function to copy url
    const url = (window.location.href);
    const copyURL = () => {
        // Copy the text inside the Clipboard
        navigator.clipboard.writeText(url);
        toast.success(' Url Copied!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    // Function to close modal

    const HandleonClose = (event) => {

        if (event.target.id === "modal")

            onClose();
    }
    if (!visible) return null;

    return (
        <div>
            <ToastContainer />
            <div onClick={HandleonClose} id="modal" className="fixed flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm  p-4  inset-0  w-full h-full">
                <div className=" relative items-center w-full max-w-md md:h-auto">
                    <div className="relative top-1/3 bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                            {/* Close Button */}
                            <AiOutlineClose className="w-5 font-bold h-5" />
                        </button>
                        <div className="p-6 text-center">
                            <div className='text-white my-8  h-10 rounded-lg pl-4 overflow-hidden flex  items-center bg-pink-200 w-10/12' >
                                <div className=" justify-start text-black">
                                    <h3 className='text' >{url}</h3>
                                </div>

                                {/* button to copy url */}

                                <button onClick={copyURL} className='bg-green-400 text-black hover:scale-110 rounded-lg absolute right-[8px] px-5 h-10'>Copy</button>
                            </div>
                            {/* Sharing button to Socials are for visuals only, they don't work */}
                            <div className="flex space-evenly text-3xl mb-3">
                                <BsLinkedin className='m-2 hover:scale-110 text-blue-600' />
                                <BsWhatsapp className='m-2  hover:scale-110 text-green-500' />
                                <FaXTwitter className='m-2 hover:scale-110' />
                                <SiGmail className='m-2 hover:scale-110 text-red-600' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareModel
