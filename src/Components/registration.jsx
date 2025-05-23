import React from 'react'
import registrationImage from '../assets/Form Image.png'
import wheelchairIcon from '../assets/Wheelchair man.png'
const Registration = () => {
return (
    <div className='border flex p-10 gap-10'>
            <img src={registrationImage} />
            <div className='registration-details flex flex-col gap-10'>
                <div className="heading flex justify-center items-center gap-4">
                    <img src={wheelchairIcon} />
                    <h1 className='font-bold text-4xl averia-serif-libre'>
                        Person with Disability
                        <span className='text-blue-900 block'> Medical System</span>
                    </h1>
                </div>
                <div className="call-to-action text-xs space-y-1">
                    <p>Register to the Persons With Disability (PWD) Medical System.</p>
                    <p>
                        Already have an account? &nbsp;
                        <span className='text-blue-500'>Login?</span>
                    </p>
                </div>
                <div className="divider h-0.25 w-11/12 bg-gray-600 mx-auto"></div>
                <form className='flex flex-col gap-4'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required className="mb-2 p-2 border rounded" />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required className="mb-2 p-2 border rounded" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required className="mb-4 p-2 border rounded" />
                    <button type="submit" className="bg-blue-900 text-white py-2 rounded">Register</button>
                </form>
            </div>
    </div>
)
}

export default Registration