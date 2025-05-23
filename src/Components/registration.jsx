import React from 'react'
import registrationImage from '../assets/Form Image.png'
import wheelchairIcon from '../assets/Wheelchair man.png'
const Registration = () => {
  return (
    <div className='border flex'>
        <img src={registrationImage}/>
        <div className='registration-details'>
          <div className="heading">
            <img/>
            <h1>Person with Disability<span>Medical System</span></h1>
          </div>
            <p className='text-sm'>Please fill in the form below to register.</p>
            <form className='flex flex-col'>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
  )
}

export default Registration