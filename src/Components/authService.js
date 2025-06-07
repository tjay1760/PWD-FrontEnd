// src/services/authService.js
import axios from 'axios';

// Assuming your backend is running on localhost:5000 as per your config
const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  // Function to handle user login
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      // Assuming the backend sends tokens in the response data
      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Function to handle user logout
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      // Check if a refresh token exists before attempting to log out
      if (!refreshToken) {
        console.warn('No refresh token found. User already logged out or session expired locally.');
        // Even if no token, we proceed to clear local storage to ensure a clean state
        localStorage.clear();
        return; // Exit early if no token to send
      }

      // Send the refresh token to the backend for invalidation
      const response = await axios.post(`${API_URL}/logout`, { refreshToken });

      // Clear all authentication-related items from local storage
      localStorage.clear(); // Or remove specific items: removeItem('accessToken'), removeItem('refreshToken')

      console.log('Logout successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      // Even if the logout request fails on the server (e.g., token invalid),
      // we should still clear local storage to prevent issues on the client side.
      localStorage.clear();
      throw error; // Re-throw the error for further handling if needed by the caller
    }
  },

  // You might also add functions for:
  // refreshToken: async () => { ... }
  // register: async (userData) => { ... }
  // resetPassword: async (email) => { ... }
  // changePassword: async (passwords) => { ... }
};

export default authService;