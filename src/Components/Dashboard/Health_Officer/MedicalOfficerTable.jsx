import React, { useState } from 'react';
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
} from '@mui/material';
import { Search, MoreHorizontal, SlidersHorizontal } from 'lucide-react'; // Importing icons from lucide-react

// Sample data for the table rows
const initialRows = [
  {
    id: 1,
    name: 'Name Surname',
    // Placeholder image URL with specific dimensions and colors
    avatar: 'https://placehold.co/40x40/FF5733/FFFFFF?text=NS',
    county: 'Nairobi',
    subCounty: 'Dagoretti',
  },
  {
    id: 2,
    name: 'Name Surname',
    // Placeholder image URL with specific dimensions and colors
    avatar: 'https://placehold.co/40x40/33FF57/FFFFFF?text=NS',
    county: 'Nairobi',
    subCounty: 'Embakasi East',
  },
  // Add more sample data here if needed to demonstrate scrolling or more rows
];

function MedicalOfficerTable() {
  // State for managing the search bar input
  const [searchText, setSearchText] = useState('');
  // State for managing the table data
  const [rows, setRows] = useState(initialRows);
  // State for managing selected rows (checkboxes)
  const [selected, setSelected] = useState([]);

  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // In a real application, you would add filtering logic here
    // based on the searchText to update the 'rows' state.
  };

  // Handler for selecting/deselecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // If checkbox is checked, select all row IDs
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    // Otherwise, clear all selections
    setSelected([]);
  };

  // Handler for individual row checkbox clicks
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      // If not selected, add to selected array
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      // If it's the first item, remove it from the beginning
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // If it's the last item, remove it from the end
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // If it's in the middle, remove it by splitting and concatenating
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // Helper function to check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    // Main container for the component, with responsive padding and background
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen font-inter">
      {/* Centered content area with white background and shadow */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {/* Search Bar Component */}
        <TextField
          fullWidth // Makes the TextField take full width of its parent
          variant="outlined" // Standard outlined style
          placeholder="Search by Name, ID No. or Email..." // Placeholder text
          value={searchText} // Binds value to searchText state
          onChange={handleSearchChange} // Handles input changes
          InputProps={{
            // Adornment for the search icon at the start of the input
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" /> {/* Search icon */}
              </InputAdornment>
            ),
            className: 'rounded-lg', // Tailwind class for rounded corners on the input itself
          }}
          className="mb-6" // Margin bottom for spacing
          // sx prop for custom Material UI styling overrides, ensuring rounded corners and border colors
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.5rem', // Matches Tailwind's rounded-lg
              '& fieldset': {
                borderColor: '#e5e7eb', // Tailwind's gray-200 for default border
              },
              '&:hover fieldset': {
                borderColor: '#d1d5db', // Tailwind's gray-300 on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6', // Tailwind's blue-500 when focused
              },
            },
          }}
        />

        {/* Table Component */}
        <TableContainer component={Paper} className="rounded-lg shadow-sm">
          <Table aria-label="user table">
            {/* Table Header */}
            <TableHead className="bg-gray-50">
              <TableRow>
                {/* Checkbox for selecting all rows */}
                <TableCell padding="checkbox" className="w-12">
                  <Checkbox
                    // Indeterminate state if some but not all are selected
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    // Checked state if all rows are selected
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick} // Handler for select all
                    inputProps={{ 'aria-label': 'select all users' }}
                    // sx prop for custom checkbox color
                    sx={{
                      color: '#9ca3af', // Tailwind gray-400 for unchecked
                      '&.Mui-checked': {
                        color: '#3b82f6', // Tailwind blue-500 for checked
                      },
                    }}
                  />
                </TableCell>
                {/* Table Headers for Name, County, Sub-County, and Bulk Action */}
                <TableCell className="font-semibold text-gray-700">Name</TableCell>
                <TableCell className="font-semibold text-gray-700">
                  County{' '}
                  {/* Icon button for sorting/filtering County */}
                  <IconButton size="small" className="ml-1">
                    <SlidersHorizontal size={16} className="text-gray-500" />
                  </IconButton>
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Sub-County{' '}
                  {/* Icon button for sorting/filtering Sub-County */}
                  <IconButton size="small" className="ml-1">
                    <SlidersHorizontal size={16} className="text-gray-500" />
                  </IconButton>
                </TableCell>
                <TableCell align="right" className="font-semibold text-gray-700 w-32">
                  Bulk Action{' '}
                  {/* Icon button for Bulk Action options */}
                  <IconButton size="small">
                    <SlidersHorizontal size={16} className="text-gray-500" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row.id); // Check if current row is selected
                return (
                  <TableRow
                    hover // Adds hover effect to the row
                    onClick={(event) => handleClick(event, row.id)} // Handles row click for selection
                    role="checkbox" // ARIA role for accessibility
                    aria-checked={isItemSelected} // ARIA state for accessibility
                    tabIndex={-1} // Makes row focusable but not part of tab order
                    key={row.id} // Unique key for React list rendering
                    selected={isItemSelected} // Material UI prop to apply selected styling
                    className="border-b border-gray-200" // Bottom border for row separation
                  >
                    {/* Checkbox for individual row selection */}
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected} // Binds checked state to isItemSelected
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.id}` }}
                        // sx prop for custom checkbox color
                        sx={{
                          color: '#9ca3af', // Tailwind gray-400 for unchecked
                          '&.Mui-checked': {
                            color: '#3b82f6', // Tailwind blue-500 for checked
                          },
                        }}
                      />
                    </TableCell>
                    {/* Name column with Avatar and Name */}
                    <TableCell component="th" scope="row" padding="none">
                      <div className="flex items-center space-x-3 py-2">
                        <Avatar src={row.avatar} alt={row.name} className="w-10 h-10" /> {/* User avatar */}
                        <span className="font-medium text-gray-900">{row.name}</span> {/* User name */}
                      </div>
                    </TableCell>
                    {/* County column */}
                    <TableCell className="text-gray-600">{row.county}</TableCell>
                    {/* Sub-County column */}
                    <TableCell className="text-gray-600">{row.subCounty}</TableCell>
                    {/* Action buttons column */}
                    <TableCell align="right">
                      <div className="flex justify-end items-center space-x-2">
                        {/* Approve Button */}
                        <Button
                          variant="contained" // Filled button style
                          size="small" // Small size
                          // sx prop for custom styling (background, hover, border-radius, text transform)
                          sx={{
                            backgroundColor: '#22c55e', // Tailwind green-500
                            '&:hover': {
                              backgroundColor: '#16a34a', // Tailwind green-600 on hover
                            },
                            borderRadius: '0.375rem', // Matches Tailwind's rounded-md
                            textTransform: 'none', // Prevents uppercase text
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Tailwind shadow-sm
                            padding: '0.375rem 0.75rem', // Tailwind px-3 py-1.5
                          }}
                        >
                          Approve
                        </Button>
                        {/* Reject Button */}
                        <Button
                          variant="contained" // Filled button style
                          size="small" // Small size
                          // sx prop for custom styling (background, hover, border-radius, text transform)
                          sx={{
                            backgroundColor: '#ef4444', // Tailwind red-500
                            '&:hover': {
                              backgroundColor: '#dc2626', // Tailwind red-600 on hover
                            },
                            borderRadius: '0.375rem', // Matches Tailwind's rounded-md
                            textTransform: 'none', // Prevents uppercase text
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Tailwind shadow-sm
                            padding: '0.375rem 0.75rem', // Tailwind px-3 py-1.5
                          }}
                        >
                          Reject
                        </Button>
                        {/* More options icon button */}
                        <IconButton size="small" className="text-gray-500 hover:bg-gray-100 rounded-full">
                          <MoreHorizontal size={20} /> {/* Ellipsis icon */}
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default MedicalOfficerTable;
