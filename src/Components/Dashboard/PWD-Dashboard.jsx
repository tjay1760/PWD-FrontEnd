import React from 'react'


const PWD_Dashboard = ({userData}) => {
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const selectedMonth = 'December 2025'; // This could be managed in parent if dynamic

  // Destructure user data for display
  const userName = userData ? `${userData.fullName}` : 'Guest';
  return (
    <div className="flex items-start mb-6 gap-4 justify-around">
        <div className="flex items-center border border-blue-300 rounded-2xl p-2 bg-white shadow-sm">
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center ">
            <span className="text-2xl font-bold text-gray-700">
              {userName
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
              }
            </span>
          </div>
          <div className=' rounded-2xl p-2 flex gap-10' >
            <div className="details">
            <h1 className="text-2xl font-bold text-gray-800">Hello, {userName}</h1>
            <p className="text-gray-600 p-2 bg-gradient-to-r from-white via-blue-200 to-white text-xl font-bold mb-5">Welcome</p>
            <div className="flex items-center mt-1 text-sm  text-blue-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span className='text-xs'>Wednesday, 21 May 2025</span>
              <Clock className="w-4 h-4 ml-4 mr-1 " />
              <span className='text-xs'>17:20 PM</span>
            </div>
            </div>
<img src={DetailsImage} alt="Details" className="mt-4 rounded-lg" />
          </div>
        </div>
        
<div className="bg-gradient-to-r from-[#83DBB2] to-[#FF9800] rounded-lg p-4 text-black">
  <div className="appointment-heading flex gap-2 items-center">
    <img src={AppontmentCalender} alt="Appointment Calendar" className="" />
    <div className="text-xl font-bold">Upcoming Appointment</div>
  </div>
  <div className="mt-2 ">
    <div className="hospital-and-visit flex items-center gap-10 mb-4">
      <div className="hospital-details flex items-center mb-2">
      <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center ">
            <span className="text-2xl font-bold text-gray-700">
              {"Mama Lucy"
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
              }
            </span>
          </div>
          <div className="font-bold text-lg">Mama Lucy Kibaki Hospital</div>
    </div> 
    <div className="vertical-bar w-0.25 h-10 bg-black"></div>
    <div className="visit-date">
                          <div className="font-bold text-lg opacity-90">Specialist Visit</div>
            <div className="flex items-center mt-2 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Friday, 06 Jun 2025</span>
              <Clock className="w-4 h-4 ml-2 mr-1" />
              <span>08:00 AM</span>
            </div>
            </div>
    </div>
   
    
            

            <div className="flex gap-2 mt-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Schedule Appointment</button>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">Peer Review and Approvals</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PWD_Dashboard