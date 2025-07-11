import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Box,
  Button
} from '@mui/material';
import { MoreVertical, ArrowUp, ArrowDown } from 'lucide-react'; // Remove ArrowLeft here
// REMOVE THIS IMPORT: PWD_Profile should only be imported and rendered in Dashboard.jsx
// import PWD_Profile from './PWD/PWD_Profile';

// ACCEPT onShowPwdProfile as a prop
function AssessmentsTable({ onShowPwdProfile }) { // <--- Add onShowPwdProfile prop
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('pwdName');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);



  useEffect(() => {
    const fetchAssignedAssessments = async () => {
      const API_BASE_URL = 'http://localhost:5000/api';
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setError("No access token found. Please ensure the medical officer is logged in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/assessments/assigned`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = 'Failed to fetch assigned assessments.';
          if (response.status === 401) {
            errorMessage = "Unauthorized. The access token might be expired or invalid. Please try logging in again.";
          } else if (response.status === 403) {
            errorMessage = "Forbidden. Your account might not have the 'medical_officer' role, or it might not be approved by a county director yet.";
          } else if (response.status === 404) {
            errorMessage = "Medical officer profile not found.";
          }
          setError(errorMessage);
          console.error('Fetch error details:', response.status, errorData);
          setAssessments([]);
        } else {
          const data = await response.json();
          const formattedAssessments = data.assessments.map(item => ({
            id: item.id,
            pwdId: item.pwdId, // Assuming this is correctly coming from backend now
            pwdName: item.pwdName,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            evaluationType: item.assessmentCategory,
            status: item.status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
            date: new Date(item.assessmentDate).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }),
            rawDate: new Date(item.assessmentDate),
            pwdGender: item.pwdGender,
            pwdAge: item.pwdAge,
            county: item.county,
            hospital: item.hospital,
            createdAt: item.createdAt,
          }));
          setAssessments(formattedAssessments);
          setError(null);
        }
      } catch (err) {
        console.error('Network or unexpected error:', err);
        setError("A network error occurred. Please try again.");
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };

    // ALWAYS fetch assessments here regardless of PWD profile state
    // The conditional rendering of PWD profile is now handled by Dashboard.jsx
    fetchAssignedAssessments();

  }, []); // <--- Remove showPwdProfile from dependency array

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = assessments.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Modified handleClick to CALL THE PROP FUNCTION
  const handleClick = async (event, id, row) => {
    // Prevent event bubbling to the checkbox if it's clicked
    if (event.target.type === 'checkbox') {
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
        return; // Exit if checkbox was clicked
    }


    // Fetch user data directly when the row is clicked (excluding checkbox click)
    if (row && row.pwdId) {
      console.log("this is the row:", row)  
        const userId = row.pwdId;
        const API_BASE_URL = 'http://localhost:5000/api';
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            console.error("Cannot fetch user details: No access token found.");
            alert("Authentication token missing. Please log in.");
            return;
        }

        try {
            // DO NOT set local loading state for the profile here.
            // The parent will handle overall content loading.
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Failed to fetch user details for ${userId}:`, response.status, errorData);
                // Report error back to user or a centralized error handler
                alert(`Failed to fetch user details: ${errorData.message || 'Unknown error'}`);
            } else {
                const userData = await response.json();
                               userData.user.hospital = row.hospital
                               userData.user.assesmentId = row.id
                               
                // CALL THE onShowPwdProfile PROP TO TELL THE PARENT TO SHOW THE PROFILE
                if (onShowPwdProfile) { // Ensure the prop exists before calling
                  onShowPwdProfile(userData); // Assuming your backend returns { data: userObject }
                }
            }
        } catch (err) {
            console.error(`Network or unexpected error fetching user ${userId}:`, err);
            alert("A network error occurred while fetching user details. Please try again.");
        } finally {
            // DO NOT end loading state here, as it's not managed locally for profile view
        }
    } else {
        console.warn(`Could not find pwdId for assessment ID ${id}. Cannot fetch user data.`);
        alert("Unable to fetch user details. Assessment data might be incomplete.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (orderBy === 'date' && a.rawDate && b.rawDate) {
      aValue = a.rawDate;
      bValue = b.rawDate;
    }

    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(assessments, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, assessments],
  );

  const getStatusBadge = (status) => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-800';
    switch (status) {
      case 'Pending Review':
        bgColor = 'bg-orange-100';
        textColor = 'text-orange-700';
        break;
      case 'Mo Review':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-700';
        break;
      case 'Director Review':
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-700';
        break;
      case 'Approved':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
        break;
      case 'Rejected':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        break;
      case 'No Show':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        break;
      default:
        break;
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  const handleMenuClick = (event, rowId) => {
    setAnchorEl({ target: event.currentTarget, rowId: rowId });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (action) => {
    const rowId = anchorEl?.rowId;
    console.log(`Action: ${action} for row ID: ${rowId}`);

    if (action === 'view') {
      const assessmentToView = assessments.find(a => a.id === rowId);

      if (assessmentToView && assessmentToView.pwdId) {
        const userId = assessmentToView.pwdId;
        const API_BASE_URL = 'http://localhost:5000/api';
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          console.error("Cannot fetch user details: No access token found.");
          alert("Authentication token missing. Please log in.");
          handleMenuClose();
          return;
        }

        try {
          // DO NOT set local loading state for the profile here.
          const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Failed to fetch user details for ${userId}:`, response.status, errorData);
            alert(`Failed to fetch user details: ${errorData.message || 'Unknown error'}`);
          } else {
            const userData = await response.json();
            console.log(`Successfully fetched user data for ${userId}:`, userData);
            // CALL THE onShowPwdProfile PROP TO TELL THE PARENT TO SHOW THE PROFILE
            if (onShowPwdProfile) {
              onShowPwdProfile(userData); // Assuming your backend returns { data: userObject }
            }
          }
        } catch (err) {
          console.error(`Network or unexpected error fetching user ${userId}:`, err);
          alert("A network error occurred while fetching user details. Please try again.");
        } finally {
            // DO NOT end loading state here.
        }
      } else {
        console.warn(`Could not find assessment with ID ${rowId} or missing pwdId to fetch user data.`);
        alert("Unable to fetch user details. Assessment data might be incomplete.");
      }
    }
    // Add logic for other actions like 'submit', 'reschedule' here
    handleMenuClose();
  };


  return (
    <Paper className="w-full overflow-hidden shadow-lg rounded-lg">
      <TableContainer className="max-h-[70vh]">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" className="!bg-gray-50">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < assessments.length}
                  checked={assessments.length > 0 && selected.length === assessments.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all assessments' }}
                />
              </TableCell>
              <TableCell className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center">
                  <Typography onClick={() => handleRequestSort('pwdName')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    PWD Name
                    {orderBy === 'pwdName' ? (
                      order === 'asc' ? <ArrowUp className="ml-1" size={16} /> : <ArrowDown className="ml-1" size={16} />
                    ) : null}
                  </Typography>
                </div>
              </TableCell>
              <TableCell className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center">
                    <Typography onClick={() => handleRequestSort('evaluationType')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        Assessment Type
                        {orderBy === 'evaluationType' ? (
                        order === 'asc' ? <ArrowUp className="ml-1" size={16} /> : <ArrowDown className="ml-1" size={16} />
                        ) : null}
                    </Typography>
                </div>
              </TableCell>
              <TableCell className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center">
                    <Typography onClick={() => handleRequestSort('status')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        Status
                        {orderBy === 'status' ? (
                        order === 'asc' ? <ArrowUp className="ml-1" size={16} /> : <ArrowDown className="ml-1" size={16} />
                        ) : null}
                    </Typography>
                </div>
              </TableCell>
              <TableCell className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center">
                    <Typography onClick={() => handleRequestSort('date')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        Assessment Date
                        {orderBy === 'date' ? (
                        order === 'asc' ? <ArrowUp className="ml-1" size={16} /> : <ArrowDown className="ml-1" size={16} />
                        ) : null}
                    </Typography>
                </div>
              </TableCell>
              <TableCell align="right" className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center justify-end">
                    <Typography>Actions</Typography>
                </div>
              </TableCell>
              <TableCell align="right" className="!bg-gray-50"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '200px' }}>
                            <CircularProgress />
                            <Typography variant="h6" className="mt-4 text-gray-600">Loading Assessments...</Typography>
                        </Box>
                    </TableCell>
                </TableRow>
            ) : error ? (
                <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-red-600 font-medium">
                        <Typography variant="h6">{error}</Typography>
                        <Typography variant="body2" className="mt-2 text-gray-500">Please check your network connection or try logging in again.</Typography>
                    </TableCell>
                </TableRow>
            ) : visibleRows.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No assessments assigned to you.
                    </TableCell>
                </TableRow>
            ) : (
              visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id, row)} // Pass 'row' here
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    className="!transition-colors !duration-200 hover:!bg-gray-50"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': `table-checkbox-${row.id}` }}
                        // Prevent row click from firing when checkbox is clicked
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleClick(event, row.id, row)} // Let checkbox handle its own click
                      />
                    </TableCell>
                    <TableCell component="th" id={`table-checkbox-${row.id}`} scope="row" padding="none">
                      <div className="flex items-center space-x-3 px-6 py-4">
                        <Avatar src={row.avatar} alt={row.pwdName} className="!w-8 !h-8" />
                        <span className="font-medium text-gray-800">{row.pwdName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{row.evaluationType}</TableCell>
                    <TableCell>
                      {getStatusBadge(row.status)}
                    </TableCell>
                    <TableCell className="text-gray-600">{row.date}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="more"
                        id={`action-button-${row.id}`}
                        aria-controls={open && anchorEl?.rowId === row.id ? 'long-menu' : undefined}
                        aria-expanded={open && anchorEl?.rowId === row.id ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => {
                          event.stopPropagation(); // Stop propagation to prevent row click from firing
                          handleMenuClick(event, row.id);
                        }}
                        sx={{color: 'gray'}}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          'aria-labelledby': `action-button-${anchorEl?.rowId}`,
                        }}
                        anchorEl={anchorEl?.target}
                        open={open && anchorEl?.rowId === row.id}
                        onClose={handleMenuClose}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: '120px',
                          },
                        }}
                      >
                        <MenuItem onClick={() => handleMenuItemClick('view')}>View</MenuItem>
                        {row.status === 'Pending Review' && (
                           <MenuItem onClick={() => handleMenuItemClick('submit')}>Submit Assessment</MenuItem>
                        )}
                        <MenuItem onClick={() => handleMenuItemClick('reschedule')}>Reschedule</MenuItem>

                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={assessments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="!text-sm"
      />
    </Paper>
  );
}

export default AssessmentsTable;