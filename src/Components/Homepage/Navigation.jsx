import React from 'react';
import WheelChairMan from '../../assets/Wheelchair man.png'; // This path caused an error.
// Using a placeholder image URL for now. Please replace with your actual image path.
// const WheelChairMan = 'https://placehold.co/40x40/000000/FFFFFF?text=Logo'; 

import { Phone, Email, WhatsApp } from '@mui/icons-material'; // Make sure @mui/icons-material is installed

const Navigation = () => {
  return (
    <nav className='flex border rounded-full w-5/6 px-6 py-3 justify-between items-center bg-white shadow-lg
                    fixed top-4 left-1/2 -translate-x-1/2 z-50 overflow-hidden font-inter opacity-85 hover:opacity-100 transition-opacity duration-300'> 
        <a className="logos flex items-center gap-2" href='#home'> {/* Added a link to the home section */}
            {/* Using the placeholder image. Remember to update the src with your actual image path. */}
            <img src={WheelChairMan} alt='logo' className="h-10 w-auto rounded-full"/> {/* Added basic image styling */}
            <h1 className='font-bold text-lg sm:text-xl md:text-2xl text-gray-800 whitespace-nowrap'>PWD Medical System</h1> {/* Responsive text size and color */}
        </a>
        <div className="navigation hidden md:flex gap-6 lg:gap-8"> {/* Hide on small screens, show on medium and up */}
            <a href="#about" className='nav-link text-gray-900 hover:text-blue-600 font-bold text-xl transition duration-300'>About</a>
            <a href="#contacts" className='nav-link text-gray-900 hover:text-blue-600 font-bold text-xl transition duration-300'>Contacts</a>
        </div>
        <div className="icons flex gap-3 sm:gap-4 text-gray-600"> {/* Adjusted gap and color */}
            {/* Added a bit of padding/margin to icons to make them more clickable */}
            <Phone className="p-1 cursor-pointer hover:text-blue-500 transition-colors duration-300"/>
            <Email className="p-1 cursor-pointer hover:text-blue-500 transition-colors duration-300"/>
            <WhatsApp className="p-1 cursor-pointer hover:text-blue-500 transition-colors duration-300"/>
        </div>
    </nav>
  );
}

export default Navigation;
