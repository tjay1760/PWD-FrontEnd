import React from 'react';
import { Bell, RefreshCcw, Accessibility } from 'lucide-react';
import WheeelChairIcon from "../../assets/Wheelchair man.png"; // Assuming this path is correct

// Import Material-UI components
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'; // Optional: for arranging multiple avatars if needed, but useful for context

// Helper function to get initials (e.g., "John Doe" -> "JD")
function stringAvatar(name) {
  const parts = name.split(' ');
  let initials = '';
  if (parts.length > 0) {
    initials += parts[0][0]; // First initial of first name
    if (parts.length > 1) {
      initials += parts[parts.length - 1][0]; // First initial of last name
    }
  }
  return {
    // Optionally, you can add dynamic background colors based on the name
    // sx: { bgcolor: stringToColor(name) },
    children: initials.toUpperCase(),
  };
}

// Function to generate a consistent color based on a string (optional but nice)
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}


// --- Main Navbar Component ---
export default function Navbar({ userName = "John Doe" }) { // Add userName prop with a default for demonstration
  const userSurname = userName.split(' ').pop(); // Get the last word (surname)
  const avatarLetter = userSurname ? userSurname[0].toUpperCase() : ''; // Get the first letter of the surname

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Left Section - Logo & Title */}
      <div className="flex items-center space-x-2">
        <img src={WheeelChairIcon} alt="Logo" className="h-10 w-10 rounded-full" />
        <div className="leading-4">
          <h1 className="text-sm font-semibold text-gray-900">Persons With Disability</h1>
          <p className="text-sm text-blue-800 font-semibold">Medical System</p>
        </div>
      </div>

      {/* Right Section - Icons and Avatar */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700 hidden sm:block">PWD</span>
        <RefreshCcw className="w-5 h-5 cursor-pointer text-gray-600" />
        <Accessibility className="w-5 h-5 cursor-pointer text-gray-600" />
        <Bell className="w-5 h-5 cursor-pointer text-gray-600" />

        {/* Avatar Dropdown */}
        <div className="relative group">
          {/* Material-UI Avatar */}
          <Avatar
            {...stringAvatar(userName)} // Uses the stringAvatar helper for initials and optional color
            sx={{ width: 32, height: 32, cursor: 'pointer' }} // Set size and cursor directly
            // If you want a specific background color:
            // sx={{ bgcolor: 'deepPurple[500]', width: 32, height: 32, cursor: 'pointer' }}
          >
            {avatarLetter} {/* This will render the first letter of the surname */}
          </Avatar>

          {/* Existing Dropdown Content */}
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-10">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}