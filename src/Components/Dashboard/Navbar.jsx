import React from 'react';
import { Bell, RefreshCcw} from 'lucide-react';
import WheeelChairIcon from "../../assets/Wheelchair man.png";
import HelpIcon from "../../assets/help.svg"

// Import Material-UI components
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// Helper function to get initials (e.g., "John Doe" -> "JD")
function stringAvatar(name) {
  const parts = name.split(' ');
  let initials = '';
  if (parts.length > 0) {
    initials += parts[0][0];
    if (parts.length > 1) {
      initials += parts[parts.length - 1][0];
    }
  }
  return {
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
export default function Navbar({ userName = "John Doe", onLogout }) {
  const userSurname = userName.split(' ').pop();
  const avatarLetter = userSurname ? userSurname[0].toUpperCase() : '';

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
        <img src={HelpIcon} alt="Help" className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer text-gray-600" />

        {/* Avatar Dropdown - Fix applied here */}
        <div className="relative group"> {/* This is the group element */}
          {/* Material-UI Avatar (the trigger) */}
          <Avatar
            {...stringAvatar(userName)}
            sx={{ width: 32, height: 32, cursor: 'pointer' }}
          >
            {avatarLetter}
          </Avatar>

          {/* Dropdown Content with Logout Button */}
          {/* Ensure this div has a negative top margin to overlap the trigger
              or adjust its position so there's no gap on hover.
              Adding `pt-2` to the dropdown for internal padding.
              The `mt-2` on the dropdown was already creating a small gap.
              We can remove `mt-2` and rely on `top-full` for positioning.
              Using `top-full` will place the dropdown immediately below the group.
          */}
          <div className="absolute right-0 top-full w-32 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-10 py-1">
            {/* Added `py-1` for a little vertical padding inside the dropdown */}
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}