import React from 'react'
import WheelChairMan from '../../assets/Wheelchair man.png'
import { Phone, Email, WhatsApp } from '@mui/icons-material'


const Navigation = () => {
  return (
    <div className='flex border rounded-lg w-5/6 mx-auto p-2 justify-between items-center bg-white shadow-lg'>
        <div className="logos flex items-center gap-2">
            <img src={WheelChairMan} alt='logo'/>
            <h1 className='font-bold text-2xl'>PWD Medical System</h1>
        </div>
        <div className="navigation flex gap-4">
            <a href="#about" className='nav-link'>About</a>
            <a href="#contacts" className='nav-link'>Contacts</a>
        </div>
        <div className="icons flex gap-4">
            <Phone />
            <Email />
            <WhatsApp />
        </div>
    </div>
  )
}

export default Navigation