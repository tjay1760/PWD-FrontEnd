import React, { useState, useEffect } from "react";
import { Bell, RefreshCcw } from "lucide-react";
import WheeelChairIcon from "../../assets/Wheelchair man.png";
import HelpIcon from "../../assets/help.svg";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringAvatar(name) {
  const parts = name.split(" ");
  let initials = "";
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

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

// --- Main Navbar Component ---
// Added onProfileClick prop
export default function Navbar({ onLogout, onProfileClick }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setLoading(false);
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            onLogout(); // Trigger logout on auth failure
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (e) {
        console.error("Failed to fetch user data:", e);
        setError(`Failed to load user data: ${e.message || e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [onLogout]); // Dependency on onLogout

  // This `onProfileClick` is now the prop passed from Dashboard
  // We simply call it when the button is clicked.
  const handleProfileButtonClick = () => {
    if (onProfileClick) {
      onProfileClick(); // Call the prop function
    }
  };

  const userName = userData?.user.name || "Loading...";
  const userRole = userData?.user.role || "";

  if (loading) {
    return (
      <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src={WheeelChairIcon}
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <div className="leading-4">
            <h1 className="text-sm font-semibold text-gray-900">
              Persons With Disability
            </h1>
            <p className="text-sm text-blue-800 font-semibold">Medical System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 animate-pulse">
          <span className="text-sm font-medium text-gray-400">Loading...</span>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#ccc' }}>
            <span className="text-gray-600 text-sm">...</span>
          </Avatar>
        </div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src={WheeelChairIcon}
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <div className="leading-4">
            <h1 className="text-sm font-semibold text-gray-900">
              Persons With Disability
            </h1>
            <p className="text-sm text-blue-800 font-semibold">Medical System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-red-600">
          <span className="text-sm font-medium">{error}</span>
          <Avatar sx={{ width: 32, height: 32, bgcolor: stringToColor("Error") }}>
            <span className="text-white">!</span>
          </Avatar>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Left Section - Logo & Title */}
      <div className="flex items-center space-x-2">
        <img
          src={WheeelChairIcon}
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />
        <div className="leading-4">
          <h1 className="text-sm font-semibold text-gray-900">
            Persons With Disability
          </h1>
          <p className="text-sm text-blue-800 font-semibold">Medical System</p>
        </div>
      </div>

      {/* Right Section - Icons and Avatar */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {userRole.toUpperCase().replace("_"," ") || "none"}
          {
            userRole==="medical_officer"?userData?.user?.medicalInfo.approved_by_medical_officer ? "✅ " : "   ⚠️ Pending approval":""
          }
        
        </span>
        <RefreshCcw className="w-5 h-5 cursor-pointer text-gray-600" />
        <img src={HelpIcon} alt="Help" className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer text-gray-600" />

        {/* Avatar Dropdown */}
        <div className="relative group">
          <Avatar
            {...stringAvatar(userName)}
            sx={{ width: 32, height: 32, cursor: "pointer", bgcolor: stringToColor(userName) }}
          />
          {/* Dropdown Content with Logout Button */}
          <div className="absolute right-0 top-full w-32 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-10 py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleProfileButtonClick} // Call the new handler
            >
              Profile
            </button>
            {userRole === "admin" && (
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </button>
            )}
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