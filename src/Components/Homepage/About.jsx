import React from 'react'
import { Light,Shield, CreditCard, Face, Folder} from '@mui/icons-material'


const About = () => {
  return (
    <div id='about' className='about'>
        <h1 className='font-bold text-4xl text-blue-600'>What is the PWD Registration System</h1>
        <p>The system offers a secure centralized platform for registering acessing and veryfying people with disabilities. it enhances service access, prevents fraud and promotes inclusion through digital innovation</p>
        <div className="cards border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div className="card">
                <Light />
                <h2>Light</h2>
                <p>Light is an essential element for visibility and accessibility.</p>
            </div>
            <div className="card">
                <Shield />
                <h2>Shield</h2>
                <p>Shield represents protection and security for users.</p>
            </div>
            <div className="card">
                <CreditCard />
                <h2>Credit Card</h2>
                <p>Credit Card symbolizes financial transactions and support.</p>
            </div>
            <div className="card">
                <Face />
                <h2>Face</h2>
                <p>Face signifies identity and personalization in the system.</p>
            </div>
            <div className="card">
                <Folder />
                <h2>File</h2>
                <p>File represents documentation and record-keeping.</p>    
            </div>
        </div>
    </div>
  )
}

export default About