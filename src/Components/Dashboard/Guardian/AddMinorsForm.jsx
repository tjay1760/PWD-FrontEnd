import React, { useState } from 'react';
import Wheelchairman from '../../../assets/Wheelchair man.png';
import {
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import for toasts


const API_BASE_URL = 'http://localhost:5000/api/users/pwds/register';



const theme = createTheme({
  typography: { fontFamily: 'sans-serif' },
  palette: {
    primary: { main: '#1a73e8' },
    success: { main: '#4CAF50' },
    text: { primary: '#333', secondary: '#000' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
  },
});

// Wrapper component for SnackbarProvider
function AddMinorsFormWrapper({ onClose, onSubmit }) {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <AddMinorsForm onClose={onClose} onSubmit={onSubmit} />
    </SnackbarProvider>
  );
}

function AddMinorsForm({ onClose, onSubmit }) {
  const { enqueueSnackbar } = useSnackbar(); 



 
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '2005-12-09',
    educationDetails: '',
    birthCertificateNumber: '', // Added this missing field based on your form
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to calculate age
  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
const getToken = () => {
  return localStorage.getItem('accessToken'); // Or whatever key you use
};
  const handleSubmit = async (e) => { // Made the function async
    e.preventDefault();
const token = getToken();
  if (!token) {
    console.error('No authentication token found.');
    // Handle unauthenticated state, e.g., redirect to login
    return;
  }
    // Age validation
    const age = calculateAge(formData.dateOfBirth);
    if (age > 18) {
      enqueueSnackbar("Warning: A junior's age should be less than 18 years.", { variant: 'warning' });
      return; // Prevent form submission if age is over 18
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        enqueueSnackbar('Minor details submitted successfully!', { variant: 'success' });
        // Optionally, reset the form after successful submission
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '2005-12-09',
          educationDetails: '',
          birthCertificateNumber: '',
        });
        // if (onClose) onClose(); // Close the form if a close handler is provided
        // if (onSubmit) onSubmit(formData); // Call parent onSubmit if provided
      } else {
        const errorData = await response.json();
        enqueueSnackbar(`Error: ${errorData.message || 'Failed to submit minor details.'}`, { variant: 'error' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      enqueueSnackbar('Network error or server is unreachable. Please try again.', { variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex flex-col items-center p-4 sm:p-6 lg:p-8 max-w-fit bg-white max-h-fit rounded-2xl">
        <Box className="flex items-center">
          <img src={Wheelchairman} alt="PWD Medical System Logo" className="h-16 w-16 mb-2" />
          <Box className="ml-4">
            <Typography variant="h6" className="font-bold text-gray-800">
              Persons With Disability
            </Typography>
            <Typography variant="h6" className="text-blue-600 font-bold">
              Medical System
            </Typography>
          </Box>
        </Box>

        <Paper className="p-6 sm:p-8 md:p-10 lg:p-12 mt-6 border">
          <Typography variant="h5" className="text-green-800 text-center mb-8 font-bold">
           Add a Minor's Details
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FULL NAME */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Full Name</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className="border p-2 rounded w-full"
                />
                <input
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Middle Name"
                  className="border p-2 rounded w-full"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            {/* DEMOGRAPHICS */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  name="gender"
                  value={formData.gender} // Ensure value is in lowercase for consistency
                  onChange={handleChange}
                  required
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full pr-10"
                  />
                </div>
              </div>
            </div>

            {/* BIRTH CERTIFICATE NUMBER */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">BIRTH CERTIFICATE NUMBER</h2>
              <input
                name="birthCertificateNumber"
                value={formData.birthCertificateNumber}
                onChange={handleChange}
                required
                placeholder="Birth Certificate Number"
                className="border p-2 rounded w-full"
              />
            </div>

            {/* OCCUPATION & EDUCATION */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Occupation and Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="educationDetails" // Corrected name to 'educationDetails' for clarity, assuming backend expects this. Update backend if necessary.
                  value={formData.educationDetails}
                  onChange={handleChange}
                  placeholder="Education Details"
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Education Details</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="tertiary">Tertiary</option>
                </select>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-center">
              <Button
                type="submit"
                
                variant="outlined"
                color="success"
                size="large"
                endIcon={<Send />}
                className="py-3 px-8 shadow-md hover:shadow-lg border border-green-900 text-green-900"
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default AddMinorsFormWrapper; // Export the wrapper component