import React from 'react'

const Steps = () => {
  return (
    <div className='px-36 py-10'>
        <h1 className='text-center text-6xl text-blue-800 font-serif py-5 font-bold'>Simple Steps to Get Registered</h1>
    <div className="steps flex gap-4 mt-10">
        <div className="div">
            <h1 className='font-bold text-6xl text-green-600'>01.</h1>
            <p className='font-bold text-xl'>Register as a Person with Disability or Guardian</p>
        </div>
        <div className="div">
            <h1 className='font-bold text-6xl text-green-600'>02.</h1>
            <p className='font-bold text-xl'> Visit a gazetted health facility for medical assessment</p>
        </div>
        <div className="div">
            <h1 className='font-bold text-6xl text-green-600'>03.</h1>
            <p className='font-bold text-xl'>Receive and download your approved medical report</p>
        </div>
        <div className="div">
            <h1 className='font-bold text-6xl text-green-600'>04.</h1>
            <p className='font-bold text-xl'>Use your medical report to apply for the disability certificate on e-Citizen</p>
        </div>
    </div>
    </div>
  )
}

export default Steps