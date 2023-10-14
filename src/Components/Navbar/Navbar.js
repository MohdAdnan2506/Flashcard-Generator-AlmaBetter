import React from 'react'
import DarkTheme from '../DarkTheme/DarkTheme'
import Logo from './logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-16 w-screen fixed z-50 flex items-center bg-white dark:bg-[#020c12] space-between drop-shadow-md'>
            <div className='flex items-center font-medium text-3xl'>
                <Link to="/">
                    <img className='h-10 my-auto ml-4 dark:invert' src={Logo} alt="AlmaBetter" />
                </Link >
            </div>
            <DarkTheme />
        </div>
    )
}

export default Navbar
