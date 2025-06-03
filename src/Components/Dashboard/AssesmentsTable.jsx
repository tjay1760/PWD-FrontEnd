// Components/Dashboard/AssessmentsTable.jsx
import React, { useState, useMemo } from 'react';
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
  Typography, // For sorting header text
} from '@mui/material';
import { MoreVertical, ArrowUp, ArrowDown } from 'lucide-react'; // Icons for actions and sorting

// Dummy data (replace with actual data fetching)
const rows = [
    { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', evaluationType: 'Specialized Re-Assessment', status: 'Pending', date: 'Wednesday, 21 May 2025' },
    { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', evaluationType: 'Initial Assessment', status: 'Pending', date: 'Wednesday, 21 May 2025' },
    { id: 3, name: 'Mary Johnson', avatar: 'https://i.pravatar.cc/150?img=3', evaluationType: 'Specialized Re-Assessment', status: 'Pending', date: 'Wednesday, 21 May 2025' },
    { id: 4, name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=4', evaluationType: 'Routine Review', status: 'Pending', date: 'Wednesday, 21 May 2025' },
    { id: 5, name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?img=5', evaluationType: 'Initial Assessment', status: 'Completed', date: 'Wednesday, 21 May 2025' },
    { id: 6, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=6', evaluationType: 'Specialized Re-Assessment', status: 'No Show', date: 'Wednesday, 21 May 2025' },
    { id: 7, name: 'Sophia Davis', avatar: 'https://i.pravatar.cc/150?img=7', evaluationType: 'Specialized Re-Assessment', status: 'Completed', date: 'Wednesday, 21 May 2025' },
    { id: 8, name: 'William Taylor', avatar: 'https://i.pravatar.cc/150?img=8', evaluationType: 'Specialized Re-Assessment', status: 'Completed', date: 'Wednesday, 21 May 2025' },
    { id: 9, name: 'Olivia Wilson', avatar: 'https://i.pravatar.cc/150?img=9', evaluationType: 'Specialized Re-Assessment', status: 'Completed', date: 'Wednesday, 21 May 2025' },
    { id: 10, name: 'James Miller', avatar: 'https://i.pravatar.cc/150?img=10', evaluationType: 'Routine Review', status: 'Pending', date: 'Wednesday, 21 May 2025' },
    { id: 11, name: 'Ava Garcia', avatar: 'https://i.pravatar.cc/150?img=11', evaluationType: 'Initial Assessment', status: 'Completed', date: 'Thursday, 22 May 2025' },
    { id: 12, name: 'Benjamin Rodriguez', avatar: 'https://i.pravatar.cc/150?img=12', evaluationType: 'Specialized Re-Assessment', status: 'No Show', date: 'Thursday, 22 May 2025' },
    { id: 13, name: 'Mia Martinez', avatar: 'https://i.pravatar.cc/150?img=13', evaluationType: 'Routine Review', status: 'Pending', date: 'Friday, 23 May 2025' },
    { id: 14, name: 'Noah Hernandez', avatar: 'https://i.pravatar.cc/150?img=14', evaluationType: 'Initial Assessment', status: 'Completed', date: 'Friday, 23 May 2025' },
    { id: 15, name: 'Charlotte Lopez', avatar: 'https://i.pravatar.cc/150?img=15', evaluationType: 'Specialized Re-Assessment', status: 'Pending', date: 'Saturday, 24 May 2025' },
];


function AssessmentsTable() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [anchorEl, setAnchorEl] = useState(null); // For the action menu
  const open = Boolean(anchorEl);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Sorting logic
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
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
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
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  // Status Badge Styling (Tailwind CSS)
  const getStatusBadge = (status) => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-800';
    switch (status) {
      case 'Pending':
        bgColor = 'bg-orange-100';
        textColor = 'text-orange-700';
        break;
      case 'Completed':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
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

  // Action Menu Handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action, rowId) => {
    console.log(`Action: ${action} for row ID: ${rowId}`);
    handleMenuClose();
  };


  return (
    <Paper className="w-full overflow-hidden shadow-lg rounded-lg">
      <TableContainer className="max-h-[70vh]"> {/* Set a max height for scrollability */}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" className="!bg-gray-50">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              <TableCell className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center">
                  <Typography onClick={() => handleRequestSort('name')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    Name
                    {orderBy === 'name' ? (
                      order === 'asc' ? <ArrowUp className="ml-1" size={16} /> : <ArrowDown className="ml-1" size={16} />
                    ) : null}
                  </Typography>
                </div>
              </TableCell>
              <TableCell className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center">
                    <Typography onClick={() => handleRequestSort('evaluationType')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        Evaluation Type
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
                        Date
                        {orderBy === 'date' ? (
                        order === 'asc' ? <ArrowUp className="ml-1" size={16} /> : <ArrowDown className="ml-1" size={16} />
                        ) : null}
                    </Typography>
                </div>
              </TableCell>
              <TableCell align="right" className="!bg-gray-50 !font-semibold text-gray-700">
                <div className="flex items-center justify-end">
                    <Typography>Bulk Action</Typography>
                    {/* Add an icon or dropdown for bulk actions here if needed */}
                </div>
              </TableCell>
              <TableCell align="right" className="!bg-gray-50"></TableCell> {/* For MoreVertical icon */}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  className="!transition-colors !duration-200 hover:!bg-gray-50" // Tailwind hover for MUI Row
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': `table-checkbox-${row.id}` }}
                    />
                  </TableCell>
                  <TableCell component="th" id={`table-checkbox-${row.id}`} scope="row" padding="none">
                    <div className="flex items-center space-x-3 px-6 py-4"> {/* Added px-6 py-4 for spacing */}
                      <Avatar src={row.avatar} alt={row.name} className="!w-8 !h-8" />
                      <span className="font-medium text-gray-800">{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{row.evaluationType}</TableCell>
                  <TableCell>
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="text-gray-600">{row.date}</TableCell>
                  <TableCell align="right"></TableCell> {/* Empty for bulk action placeholder */}
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent row selection when clicking menu
                        handleMenuClick(event);
                      }}
                      sx={{color: 'gray'}} // MUI sx for color
                    >
                      <MoreVertical className="w-5 h-5" />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: '120px',
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleMenuItemClick('view', row.id)}>View</MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick('edit', row.id)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick('delete', row.id)}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="!text-sm" // Tailwind for text size
      />
    </Paper>
  );
}

export default AssessmentsTable;