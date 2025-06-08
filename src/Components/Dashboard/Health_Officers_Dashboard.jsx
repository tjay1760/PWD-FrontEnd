import React from 'react'
import {
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DetailsImage from "../../assets/details-image.png"; // Assuming you have an image for details
import AppontmentCalender from "../../assets/appointment-calender.svg"; // Assuming you have an image for appointment calendar
import Tickheart from "../../assets/vuesax-linear-heart-tick.svg";
import HeartSearch from "../../assets/vuesax-linear-heart-search.svg";
import LinearLike from "../../assets/vuesax-linear-like.svg";
import LinearLovely from "../../assets/vuesax-linear-lovely.svg";
import AssessmentsTable from "./AssesmentsTable";
import CalendarView from "./CalendarView";
import { DisabilityAssessmentChart } from "./Doctors_chart";
import { MedicalAssessmentsMap } from './HealthOfficerMap';

const Health_Officers_Dashboard = ({userData}) => {
    const userName = userData ? `${userData.fullName}` : "Guest";
  console.log("User Data dashboard:", userData.role); // For debugging purposes
  return (
    <div>
            <div className="flex items-start mb-6 gap-4 justify-around">
        <div className="flex items-center border border-blue-300 rounded-2xl p-2 bg-white shadow-sm">
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center ">
            <span className="text-2xl font-bold text-gray-700">
              {userName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className=" rounded-2xl p-2 flex gap-10">
            <div className="details">
              <h1 className="text-2xl font-bold text-gray-800">
                Hello, {userName}
              </h1>
              <p className="text-gray-600 p-2 bg-gradient-to-r from-white via-blue-200 to-white text-xl font-bold mb-5">
                Welcome
              </p>
              <div className="flex items-center mt-1 text-sm  text-blue-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-xs">Wednesday, 21 May 2025</span>
                <Clock className="w-4 h-4 ml-4 mr-1 " />
                <span className="text-xs">17:20 PM</span>
              </div>
            </div>
            <img src={DetailsImage} alt="Details" className="mt-4 rounded-lg" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#83DBB2] to-[#FF9800] rounded-lg p-4 text-black">
          <div className="appointment-heading flex gap-2 items-center">
            <img
              src={AppontmentCalender}
              alt="Appointment Calendar"
              className=""
            />
            <div className="text-xl font-bold">Upcoming Appointment</div>
          </div>
          <div className="mt-2 ">
            <div className="hospital-and-visit flex items-center gap-10 mb-4">
              <div className="hospital-details flex items-center mb-2">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center ">
                  <span className="text-2xl font-bold text-gray-700">
                    {"Mama Lucy"
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <div className="font-bold text-lg">
                  Mama Lucy Kibaki Hospital
                </div>
              </div>
              <div className="vertical-bar w-0.25 h-10 bg-black"></div>
              <div className="visit-date">
                <div className="font-bold text-lg opacity-90">
                  Specialist Visit
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Friday, 06 Jun 2025</span>
                  <Clock className="w-4 h-4 ml-2 mr-1" />
                  <span>08:00 AM</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                Schedule Appointment
              </button>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                Peer Review and Approvals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 border border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-600">COMPLETED ASSESSMENTS</div>
              <div className="text-xs text-green-600 mt-1">
                +1.5% from last month
              </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img
                src={Tickheart}
                alt="Completed"
                className="w-full text-green-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">7</div>
              <div className="text-sm text-gray-600">PENDING ASSESSMENTS</div>
              <div className="text-xs text-orange-600 mt-1">
                38% of the scheduled assessments
              </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img
                src={HeartSearch}
                alt="Pending"
                className="w-full text-orange-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-600">FLAGGED FOR REVIEW</div>
              <div className="text-xs text-blue-500 mt-1">
                0 since last week
              </div>{" "}
              {/* Changed to blue-500 for consistency with original */}
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img
                src={LinearLovely}
                alt="Flagged"
                className="w-full text-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">96%</div>
              <div className="text-sm text-gray-600">APPROVAL RATE</div>
              <div className="text-xs text-red-500 mt-1">
                -2% since last month
              </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img
                src={LinearLike}
                alt="Approval Rate"
                className="w-full text-green-600"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Assessments Table */}
      <div className="data-section flex gap-6 justify-between">
  <div className="bg-white rounded-lg p-6 border border-gray-400 mb-6">
        <h1 className="text-xl font-bold mb-4 text-green-700">Medical Officers Approval List</h1>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Below is a list of all Medical Officers for your approval</h2>
        <AssessmentsTable />
        </div>
        <MedicalAssessmentsMap />
      </div>
    
    </div>
  )
}

export default Health_Officers_Dashboard