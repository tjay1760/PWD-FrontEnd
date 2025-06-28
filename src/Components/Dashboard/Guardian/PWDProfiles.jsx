import React, { useState } from 'react';
import AddMinorsForm from './AddMinorsForm';
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
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Modal// Import InputAdornment for search icon
} from '@mui/material';
import {
  PersonAddAltOutlined, // Icon for "Add a minor"
  ArrowUpward,        // Up arrow for sorting
  ArrowDownward,      // Down arrow for sorting
  MoreVert,           // Vertical dots for context menu
  Search,             // Search icon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme to adjust colors and typography if needed
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif', // Ensure Inter font is used
  },
  palette: {
    primary: {
      main: '#1a73e8', // A blue color
    },
    success: {
      main: '#4CAF50', // Green for Scheduled
    },
    warning: {
      main: '#FFC107', // Orange for Pending
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px', // Full rounded for buttons
          textTransform: 'none', // Prevent uppercase
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded text fields
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for Paper (table container)
        },
      },
    },
  },
});

// Sample Data for the table
function createData(id, name, location, facility, date, status, avatarUrl) {
  return { id, name, location, facility, date, status, avatarUrl };
}

const initialRows = [
  createData(
    1,
    'Name Surname',
    'Nairobi Embakasi East',
    'Mama Lucy Kibaki',
    '26 Jul 2025',
    'Scheduled',
    'https://placehold.co/40x40/FF5733/FFFFFF?text=NS'
  ),
  createData(
    2,
    'Name Surname',
    'Kiambu Kikuyu',
    'Kikuyu Hospital',
    '31 Aug 2025',
    'Pending',
    'https://placehold.co/40x40/33FF57/FFFFFF?text=NS'
  ),
  createData(
    3,
    'Name Surname',
    'Nairobi Dagoretti',
    'Dagoretti Referral',
    '5 Sep 2025',
    'Pending',
    'https://placehold.co/40x40/3357FF/FFFFFF?text=NS'
  ),
  // Add more sample data as needed
];

function PwdProfilesTable() {
  const [rows, setRows] = useState(initialRows);
  const [order, setOrder] = useState('asc'); // 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState('name'); // Column to sort by
  const [selected, setSelected] = useState([]); // Selected checkboxes
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // For context menu
  const [selectedRowId, setSelectedRowId] = useState(null); // For context menu
    const [showAddMinorForm, setShowAddMinorForm] = useState(false); // For Add Minor Form modal

  // Handle request for sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Stable sort function (from Material-UI documentation examples)
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Comparator function for sorting (from Material-UI documentation examples)
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  // Handle checkbox selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Apply sorting to filtered rows
  const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));

  // Handle context menu (three dots)
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleMenuItemClick = (action) => {
    console.log(`Action: ${action} for row ID: ${selectedRowId}`);
    // Implement actual logic for 'View Details', 'Edit', 'Delete' etc.
    handleMenuClose();
  };

  // Handlers for Add Minor Form modal
  const handleOpenAddMinorForm = () => {
    setShowAddMinorForm(true);
  };

  const handleCloseAddMinorForm = () => {
    setShowAddMinorForm(false);
  };

  const handleAddMinorSubmit = (minorData) => {
    console.log("Submitting new minor:", minorData);
    // In a real app, you would add this minor to your data source
    // For now, let's just add it to the local state for demonstration
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    const newMinor = createData(
      newId,
      `${minorData.firstName} ${minorData.lastName}`,
      'N/A (New Minor)', // Default location for new minor
      'N/A (New Minor)', // Default facility for new minor
      minorData.dateOfBirth,
      'Pending', // New minors might start as pending
      `https://placehold.co/40x40/A9A9A9/FFFFFF?text=${minorData.firstName[0]}${minorData.lastName[0]}`
    );
    setRows(prevRows => [...prevRows, newMinor]);
    handleCloseAddMinorForm(); // Close modal after submission
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen font-inter">
        <Paper className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <Box>
              <Typography variant="h5" component="h1" className="font-bold text-green-700 mb-1">
                PWD's Profiles
              </Typography>
              <Typography variant="subtitle1" component="p" className="text-gray-600">
                PWD's Appointments Scheduled
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="success"
              startIcon={<PersonAddAltOutlined />}
                onClick={handleOpenAddMinorForm}
              className="mt-4 sm:mt-0 px-6 py-2 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Add a minor
            </Button>
          </Box>

          {/* Search Bar */}
          <Box className="mb-6">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Name, ID No. or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              className="bg-gray-50 rounded-lg"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px', // Full rounded like the image
                  backgroundColor: '#f9fafb', // Light grey background
                  paddingLeft: '14px', // Adjust padding if needed
                },
              }}
            />
          </Box>

          {/* Table Container */}
          <TableContainer component={Paper} className="rounded-lg shadow-md">
            <Table aria-label="PWD profiles table">
              <TableHead className="bg-gray-50">
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={handleSelectAllClick}
                      checked={selected.length === rows.length && rows.length > 0}
                      indeterminate={selected.length > 0 && selected.length < rows.length}
                    />
                  </TableCell>
                  <TableCell onClick={() => handleRequestSort('name')} className="cursor-pointer">
                    <Box className="flex items-center">
                      <Typography variant="body2" className="font-semibold text-gray-700">Name</Typography>
                      {orderBy === 'name' && (
                        <span className="ml-1">
                          {order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                        </span>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell onClick={() => handleRequestSort('location')} className="cursor-pointer">
                    <Box className="flex items-center">
                      <Typography variant="body2" className="font-semibold text-gray-700">Location</Typography>
                      {orderBy === 'location' && (
                        <span className="ml-1">
                          {order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                        </span>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell onClick={() => handleRequestSort('facility')} className="cursor-pointer">
                    <Box className="flex items-center">
                      <Typography variant="body2" className="font-semibold text-gray-700">Facility</Typography>
                      {orderBy === 'facility' && (
                        <span className="ml-1">
                          {order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                        </span>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" className="font-semibold text-gray-700">Status</Typography>
                  </TableCell>
                  <TableCell align="right"></TableCell> {/* For the three dots menu */}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows.map((row) => {
                  const isItemSelected = isSelected(row.id);
                  const statusColorClass = row.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className="transition-colors duration-200"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box className="flex items-center gap-3">
                          <Avatar src={row.avatarUrl} alt={row.name} className="w-10 h-10" />
                          <Typography variant="body1" className="font-medium text-gray-900">{row.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="text-gray-700">{row.location}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="text-gray-700">{row.facility}</Typography>
                        <Typography variant="caption" className="text-gray-500 block">{row.date}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColorClass}`}>
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(event) => {
                            event.stopPropagation(); // Prevent row selection when clicking menu
                            handleMenuClick(event, row.id);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl) && selectedRowId === row.id} // Only open for the clicked row
                          onClose={handleMenuClose}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                              width: '150px',
                              borderRadius: '8px',
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleMenuItemClick('View Details')}>
                            View Details
                          </MenuItem>
                          <MenuItem onClick={() => handleMenuItemClick('Edit')}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleMenuItemClick('Delete')}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* If no rows match search, display a message */}
                {filteredRows.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} align="center">
                            <Typography variant="body1" className="text-gray-500 py-4">No matching profiles found.</Typography>
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Modal
        open={showAddMinorForm}
        onClose={handleCloseAddMinorForm}
        aria-labelledby="add-minor-modal-title"
        aria-describedby="add-minor-modal-description"
        className="flex items-center justify-center p-4" // Tailwind for centering
      >
        {/* The AddMinorsForm component itself will have the white background and styling */}
        <AddMinorsForm onClose={handleCloseAddMinorForm} onSubmit={handleAddMinorSubmit}/>
      </Modal>
    </ThemeProvider>
  );
}

export default PwdProfilesTable;
