import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Avatar,
  CircularProgress, // Import for loading indicator
  Typography, // Import for error messages
} from '@mui/material';
import { Search, MoreHorizontal, SlidersHorizontal } from 'lucide-react'; // Importing icons from lucide-react

const APPROVAL_API_BASE_URL = "http://localhost:5000/api/approve";
const MEDICAL_OFFICERS_API_BASE_URL = "http://localhost:5000/api/users/medical-officers";

// The component now accepts an 'authToken' prop
function MedicalOfficerTable({ authToken }) {
  // State for managing the search bar input
  const [searchText, setSearchText] = useState('');
  // State for managing the table data
  const [rows, setRows] = useState([]); // Initialize with empty array as data will be fetched
  // State for managing selected rows (checkboxes)
  const [selected, setSelected] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Effect hook to fetch medical officers data on component mount or when authToken changes
  useEffect(() => {
    const fetchMedicalOfficers = async () => {
      // If no auth token is provided, we cannot fetch data
      if (!authToken) {
        setError("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true); // Set loading to true before fetching
        setError(null); // Clear any previous errors

        const response = await fetch(MEDICAL_OFFICERS_API_BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache'
          },
        });

        if (!response.ok) {
          // If response is not OK, try to parse error message from backend
          const errorData = await response.json();
          console.log(errorData)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }
        const responseData = await response.json(); // Renamed to avoid confusion with data.medicalOfficers
        console.log("Raw fetched data:", responseData); // For debugging purposes

        // Assuming responseData contains a 'medicalOfficers' array directly,
        // and each item needs to be mapped to fit the table's expected structure.
        // We need to map `_id` to `id` and combine `full_name.first` and `full_name.last` for `name`.
        const formattedRows = (responseData.medicalOfficers || []).map(officer => ({
          id: officer._id, // Map _id from backend to id for frontend state management
          name: `${officer.full_name.first} ${officer.full_name.last}`, // Combine first and last name
          county: officer.county,
          subCounty: officer.sub_county, // Ensure this matches your backend field
          email: officer.contact.email, // Added for potential future use or search
          // You can add other fields as needed for display or filtering
          // For avatar, you might want to generate from name if no actual avatar URL exists
          avatar: null, // Set to null or a URL if your data includes it
        }));

        setRows(formattedRows);
      } catch (err) {
        console.error("Failed to fetch medical officers:", err);
        setError(`Failed to load medical officers: ${err.message}. Please ensure you are authorized.`); // Set error message with more detail
      } finally {
        setLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchMedicalOfficers(); // Call the fetch function
  }, [authToken]); // Dependency array includes authToken, so it refetches if token changes

  console.log("Rows in state:", rows); // For debugging purposes

  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // Filtering logic would go here, applied to the `rows` state
  };

  // Handler for selecting/deselecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Handler for individual row checkbox clicks
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // Helper function to check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Handler for approving a medical officer
  const handleApprove = async (officerId) => {
    if (!authToken) {
      setError("Authentication token is missing. Cannot approve.");
      return;
    }

    try {
      const approveUrl = `${APPROVAL_API_BASE_URL}/${officerId}`;
      const response = await fetch(approveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Approval failed! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      setRows((prevRows) => prevRows.filter((row) => row.id !== officerId));
      setSelected((prevSelected) => prevSelected.filter((id) => id !== officerId));
      console.log(`Medical officer ${officerId} approved successfully.`);
    } catch (err) {
      console.error(`Error approving officer ${officerId}:`, err);
      setError(`Failed to approve officer ${officerId}: ${err.message}.`);
    }
  };

  return (
    // Main container for the component, with responsive padding and background
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen font-inter">
      {/* Centered content area with white background and shadow */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {/* Search Bar Component */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Name, ID No. or Email..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
            className: 'rounded-lg',
          }}
          className="mb-6"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.5rem',
              '& fieldset': {
                borderColor: '#e5e7eb',
              },
              '&:hover fieldset': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
          }}
        />

        {/* Loading and Error Indicators */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <CircularProgress />
            <Typography variant="h6" className="ml-4">Loading medical officers...</Typography>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-48">
            <Typography variant="h6" color="error" className="text-red-600 text-center">{error}</Typography>
          </div>
        )}

        {/* Table Component - Only render if not loading and no error */}
        {!loading && !error && (
          <TableContainer component={Paper} className="rounded-lg shadow-sm">
            <Table aria-label="medical officer table">
              {/* Table Header */}
              <TableHead className="bg-gray-50">
                <TableRow>
                  {/* Checkbox for selecting all rows */}
                  <TableCell padding="checkbox" className="w-12">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < rows.length}
                      checked={rows.length > 0 && selected.length === rows.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all users' }}
                      sx={{
                        color: '#9ca3af',
                        '&.Mui-checked': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </TableCell>
                  {/* Table Headers for Name, County, Sub-County, and Bulk Action */}
                  <TableCell className="font-semibold text-gray-700">Name</TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    County{' '}
                    <IconButton size="small" className="ml-1">
                      <SlidersHorizontal size={16} className="text-gray-500" />
                    </IconButton>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    Sub-County{' '}
                    <IconButton size="small" className="ml-1">
                      <SlidersHorizontal size={16} className="text-gray-500" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" className="font-semibold text-gray-700 w-32">
                    Bulk Action{' '}
                    <IconButton size="small">
                      <SlidersHorizontal size={16} className="text-gray-500" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No medical officers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id} // Use the mapped 'id'
                        selected={isItemSelected}
                        className="border-b border-gray-200"
                      >
                        {/* Checkbox for individual row selection */}
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.id}` }}
                            sx={{
                              color: '#9ca3af',
                              '&.Mui-checked': {
                                color: '#3b82f6',
                              },
                            }}
                          />
                        </TableCell>
                        {/* Name column with Avatar and Name */}
                        <TableCell component="th" scope="row" padding="none">
                          <div className="flex items-center space-x-3 py-2">
                            {/* Use row.avatar if available, otherwise use a placeholder with the first letter of the name */}
                            <Avatar
                              src={row.avatar || `https://placehold.co/40x40/FF5733/FFFFFF?text=${row.name ? row.name.charAt(0) : '?'}`}
                              alt={row.name}
                              className="w-10 h-10"
                            />
                            <span className="font-medium text-gray-900">{row.name}</span> {/* Use the mapped 'name' */}
                          </div>
                        </TableCell>

                        {/* County column */}
                        <TableCell className="text-gray-600">{row.county}</TableCell>
                        {/* Sub-County column */}
                        <TableCell className="text-gray-600">{row.subCounty}</TableCell> {/* Use the mapped 'subCounty' */}
                        {/* Action buttons column */}
                        <TableCell align="right">
                          <div className="flex justify-end items-center space-x-2">
                            {/* Approve Button */}
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleApprove(row.id); // Use the mapped 'id'
                              }}
                              sx={{
                                backgroundColor: '#22c55e',
                                '&:hover': {
                                  backgroundColor: '#16a34a',
                                },
                                borderRadius: '0.375rem',
                                textTransform: 'none',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                padding: '0.375rem 0.75rem',
                              }}
                            >
                              Approve
                            </Button>
                            {/* Reject Button */}
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(event) => event.stopPropagation()}
                              sx={{
                                backgroundColor: '#ef4444',
                                '&:hover': {
                                  backgroundColor: '#dc2626',
                                },
                                borderRadius: '0.375rem',
                                textTransform: 'none',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                padding: '0.375rem 0.75rem',
                              }}
                            >
                              Reject
                            </Button>
                            {/* More options icon button */}
                            <IconButton size="small" className="text-gray-500 hover:bg-gray-100 rounded-full">
                              <MoreHorizontal size={20} />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default MedicalOfficerTable;