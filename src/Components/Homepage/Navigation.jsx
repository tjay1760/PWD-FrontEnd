import React from 'react'
import WheelChairMan from '../../assets/Wheelchair man.png'
import { Phone, Email, WhatsApp } from '@mui/icons-material'


const Navigation = () => {
  return (
    <div className='flex border rounded-lg w-5/6 mx-auto'>
        <div className="logos">
            <img src={WheelChairMan} alt='logo'/>
            <h1>PWD Medical System</h1>
        </div>
        <div className="navigation">
            <a href="#about" className='nav-link'>About</a>
            <a href="#contacts" className='nav-link'>Contacts</a>
        </div>
        <div className="icons">
            <Phone />
            <Email />
            <WhatsApp />
        </div>
    </div>
  )
}

export default Navigation