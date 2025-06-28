import React, { useState } from 'react';
import Wheelchairman from '../../../assets/Wheelchair man.png';
import {
  Paper,
  Button,
  Typography,
  Box,
  InputAdornment
} from '@mui/material';
import { CalendarToday, Send } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function AddMinorsForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: 'Antony',
    middleName: 'Kiogora',
    lastName: 'Kaburu',
    idNumber: '12345678',
    gender: 'Male',
    dateOfBirth: '2005-12-09',
    maritalStatus: '',
    mobileNumber: '0726917891',
    emailAddress: 'Antony.kaburu@gmail.com',
    county: 'Nairobi',
    subCounty: 'Westlands',
    occupation: '',
    educationLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully! (Check console for data)');
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
                <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className="border p-2 rounded w-full" />
                <input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" className="border p-2 rounded w-full" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className="border p-2 rounded w-full" />
              </div>
            </div>

            {/* DEMOGRAPHICS */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-2 rounded w-full">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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

            {/* CONTACT */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Contact Details</h2>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                placeholder="Mobile Number (without +254)"
                className="border p-2 rounded w-full"
              />
            </div>

            {/* LOCATION */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="county" value={formData.county} onChange={handleChange} required className="border p-2 rounded w-full">
                  <option value="">Select County</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Kiambu">Kiambu</option>
                  <option value="Mombasa">Mombasa</option>
                </select>
                <select name="subCounty" value={formData.subCounty} onChange={handleChange} required className="border p-2 rounded w-full">
                  <option value="">Select Sub-County</option>
                  <option value="Westlands">Westlands</option>
                  <option value="Dagoretti">Dagoretti</option>
                  <option value="Embakasi">Embakasi</option>
                </select>
              </div>
            </div>

            {/* OCCUPATION & EDUCATION */}
            <div>
              <h2 className="text-blue-600 uppercase font-bold mb-2">Occupation and Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Occupation"
                  className="border p-2 rounded w-full"
                />
                <input
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  placeholder="Education Level"
                  className="border p-2 rounded w-full"
                />
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

export default AddMinorsForm;
