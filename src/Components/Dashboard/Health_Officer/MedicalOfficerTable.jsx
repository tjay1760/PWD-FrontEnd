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
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Search, MoreHorizontal, SlidersHorizontal } from 'lucide-react';

const APPROVAL_API_BASE_URL = "http://localhost:5000/api/users/approve";
const MEDICAL_OFFICERS_API_BASE_URL = "http://localhost:5000/api/users/medical-officers";

function MedicalOfficerTable({ authToken }) {
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Confirmation Dialog state
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'approve' or 'reject'
  const [confirmOfficerId, setConfirmOfficerId] = useState(null);
  const [confirmOfficerName, setConfirmOfficerName] = useState('');

  // Helper function to show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Handler to close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Effect hook to fetch medical officers data
  useEffect(() => {
    const fetchMedicalOfficers = async () => {
      if (!authToken) {
        setError("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(MEDICAL_OFFICERS_API_BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }
        const responseData = await response.json();

        const formattedRows = (responseData.medicalOfficers || []).map(officer => ({
          id: officer._id,
          name: `${officer.full_name.first} ${officer.full_name.last}`,
          county: officer.county,
          subCounty: officer.sub_county,
          email: officer.contact.email,
          // FIX: Ensure approved_by_director is always a boolean
          approved_by_director: officer.medical_info?.approved_by_director === true,
          avatar: null,
        }));

        setRows(formattedRows);
      } catch (err) {
        console.error("Failed to fetch medical officers:", err);
        setError(`Failed to load medical officers: ${err.message}. Please ensure you are authorized.`);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalOfficers();
  }, [authToken]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Function to handle opening the confirmation dialog
  const handleOpenConfirm = (action, officerId, officerName) => {
    setConfirmAction(action);
    setConfirmOfficerId(officerId);
    setConfirmOfficerName(officerName);
    setOpenConfirm(true);
  };

  // Function to handle closing the confirmation dialog
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setConfirmAction(null);
    setConfirmOfficerId(null);
    setConfirmOfficerName('');
  };

  // Function to execute approval/rejection after confirmation
  const handleConfirmAction = async () => {
    handleCloseConfirm(); // Close the dialog immediately

    if (!authToken) {
      showSnackbar("Authentication token is missing. Please log in.", "error");
      return;
    }

    try {
      const approvalUrl = `${APPROVAL_API_BASE_URL}/${confirmOfficerId}`;
      let method = 'PUT'; // Use PUT for updating status
      let body = { approved_by_director: confirmAction === 'approve' }; // Send specific field to update

      const response = await fetch(approvalUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Backend should ideally return the updated officer object, then you can use that.
      // For now, assume a successful response means the update happened.
      // FIX: Ensure the update logic correctly changes the specific row's property
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === confirmOfficerId
            ? { ...row, approved_by_director: confirmAction === 'approve' }
            : row
        )
      );

      // Show success toast
      showSnackbar(
        `Medical officer ${confirmOfficerName} has been ${confirmAction === 'approve' ? 'approved' : 'rejected'} successfully.`,
        'success'
      );
    } catch (err) {
      console.error(`Error ${confirmAction}ing officer ${confirmOfficerId}:`, err);
      // Show error toast
      showSnackbar(`Failed to ${confirmAction} officer ${confirmOfficerName}: ${err.message}.`, 'error');
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen font-inter">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
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

        {!loading && !error && (
          <TableContainer component={Paper} className="rounded-lg shadow-sm">
            <Table aria-label="medical officer table">
              <TableHead className="bg-gray-50">
                <TableRow>
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
                   <TableCell className="font-semibold text-gray-700">Approval Status</TableCell>
                  <TableCell align="right" className="font-semibold text-gray-700 w-32">
                    Actions{' '}
                    <IconButton size="small">
                      <SlidersHorizontal size={16} className="text-gray-500" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No medical officers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => {
                    const isItemSelected = isSelected(row.id);
                    const isApproved = row.approved_by_director;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className="border-b border-gray-200"
                      >
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
                        <TableCell component="th" scope="row" padding="none">
                          <div className="flex items-center space-x-3 py-2">
                            <Avatar
                              src={row.avatar || `https://placehold.co/40x40/FF5733/FFFFFF?text=${row.name ? row.name.charAt(0) : '?'}`}
                              alt={row.name}
                              className="w-10 h-10"
                            />
                            <span className="font-medium text-gray-900">{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{row.county}</TableCell>
                        <TableCell className="text-gray-600">{row.subCounty}</TableCell>
                        <TableCell className="text-gray-600">
                          <Typography
                            variant="body2"
                            sx={{
                              color: isApproved ? '#22c55e' : '#f59e0b',
                              fontWeight: 'medium',
                            }}
                          >
                            {isApproved ? 'Approved' : 'Pending'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex justify-end items-center space-x-2">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleOpenConfirm('approve', row.id, row.name);
                              }}
                              disabled={isApproved}
                              sx={{
                                backgroundColor: isApproved ? '#a7f3d0' : '#22c55e',
                                '&:hover': {
                                  backgroundColor: isApproved ? '#a7f3d0' : '#16a34a',
                                },
                                borderRadius: '0.375rem',
                                textTransform: 'none',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                padding: '0.375rem 0.75rem',
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleOpenConfirm('reject', row.id, row.name);
                              }}
                              disabled={!isApproved} // Only allow rejecting if currently approved
                              sx={{
                                backgroundColor: !isApproved ? '#fca5a5' : '#ef4444',
                                '&:hover': {
                                  backgroundColor: !isApproved ? '#fca5a5' : '#dc2626',
                                },
                                borderRadius: '0.375rem',
                                textTransform: 'none',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                padding: '0.375rem 0.75rem',
                              }}
                            >
                              Reject
                            </Button>
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

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {confirmAction === 'approve' ? 'Approve Medical Officer?' : 'Reject Medical Officer?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to {confirmAction === 'approve' ? 'approve' : 'reject'} **{confirmOfficerName}**?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            {confirmAction === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Toast Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MedicalOfficerTable;