import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Chip,
  Paper
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  NotificationsActive as ReminderIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import vi from 'date-fns/locale/vi';

// Generate mock data
const generateMockAppointments = () => {
  const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  const properties = ['Nhà phố Võ Thị Sáu', 'Căn hộ Nguyễn Thị Minh Khai', 'Đất nền Lê Văn Sỹ'];
  const customers = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];
  const locations = ['Tại văn phòng', 'Tại nhà khách hàng'];
  const propertyStatuses = ['pending', 'confirmed', 'rejected'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    properties: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
      property: properties[Math.floor(Math.random() * properties.length)],
      order: i + 1,
      time: new Date(Date.now() + (Math.random() * 14 - 7) * 24 * 60 * 60 * 1000 + i * 60 * 60 * 1000).toISOString(),
      status: propertyStatuses[Math.floor(Math.random() * propertyStatuses.length)]
    })),
    customerName: customers[Math.floor(Math.random() * customers.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dateTime: new Date(Date.now() + (Math.random() * 14 - 7) * 24 * 60 * 60 * 1000).toISOString(),
    location: locations[Math.floor(Math.random() * locations.length)],
    purpose: 'Xem bất động sản',
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const mockAppointments = generateMockAppointments();

const AppointmentList = () => {
  // States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    date: null,
    sort: 'newest'
  });

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (name) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [name]: event.target.value
    }));
    setPage(0);
  };

  const handleDateChange = (newValue) => {
    setFilters((prev) => ({
      ...prev,
      date: newValue
    }));
    setPage(0);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // Get status color and label
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'warning', label: 'Chờ xác nhận' };
      case 'confirmed':
        return { color: 'info', label: 'Đã xác nhận' };
      case 'completed':
        return { color: 'success', label: 'Đã hoàn thành' };
      case 'cancelled':
        return { color: 'error', label: 'Đã hủy' };
      default:
        return { color: 'default', label: status };
    }
  };

  // Get appointment type label
  const getTypeLabel = (type) => {
    switch (type) {
      case 'view':
        return 'Xem nhà';
      case 'consult':
        return 'Tư vấn';
      case 'sign':
        return 'Ký hợp đồng';
      default:
        return type;
    }
  };

  // Get property status info
  const getPropertyStatusInfo = (status) => {
    switch (status) {
      case 'confirmed':
        return { color: 'success', label: 'Đã xác nhận' };
      case 'rejected':
        return { color: 'error', label: 'Từ chối' };
      default:
        return { color: 'warning', label: 'Chờ xác nhận' };
    }
  };

  // Filter and sort appointments
  const filteredAppointments = mockAppointments
    .filter((appointment) => {
      if (filters.status !== 'all' && appointment.status !== filters.status) return false;
      if (filters.date) {
        const appointmentDate = new Date(appointment.dateTime).toDateString();
        const filterDate = new Date(filters.date).toDateString();
        if (appointmentDate !== filterDate) return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          appointment.properties.some((p) => p.property.toLowerCase().includes(searchLower)) ||
          appointment.customerName.toLowerCase().includes(searchLower) ||
          appointment.location.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.dateTime) - new Date(a.dateTime);
        case 'oldest':
          return new Date(a.dateTime) - new Date(b.dateTime);
        default:
          return 0;
      }
    });

  // Paginate appointments
  const paginatedAppointments = filteredAppointments.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <MainCard title="Danh sách Lịch hẹn">
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Tổng số lịch hẹn: {filteredAppointments.length}</Typography>
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={toggleFilters}>
            Bộ lọc
          </Button>
        </Stack>

        {/* Search and Filters */}
        <Card sx={{ p: 2, mb: 3 }}>
          <Stack spacing={3}>
            {/* Search */}
            <TextField
              fullWidth
              placeholder="Tìm kiếm lịch hẹn..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />

            {/* Filters */}
            {showFilters && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Loại cuộc hẹn</InputLabel>
                    <Select value={filters.type} onChange={handleFilterChange('type')} label="Loại cuộc hẹn">
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="view">Xem nhà</MenuItem>
                      <MenuItem value="consult">Tư vấn</MenuItem>
                      <MenuItem value="sign">Ký hợp đồng</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select value={filters.status} onChange={handleFilterChange('status')} label="Trạng thái">
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="pending">Chờ xác nhận</MenuItem>
                      <MenuItem value="confirmed">Đã xác nhận</MenuItem>
                      <MenuItem value="completed">Đã hoàn thành</MenuItem>
                      <MenuItem value="cancelled">Đã hủy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                    <DatePicker
                      label="Ngày"
                      value={filters.date}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Sắp xếp</InputLabel>
                    <Select value={filters.sort} onChange={handleFilterChange('sort')} label="Sắp xếp">
                      <MenuItem value="newest">Mới nhất</MenuItem>
                      <MenuItem value="oldest">Cũ nhất</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Stack>
        </Card>

        {/* Appointments Table */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Thời gian bắt đầu</TableCell>
                <TableCell>Bất động sản</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Địa điểm xuất phát</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAppointments.map((appointment, index) => (
                <TableRow key={appointment.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant="body2">{formatDate(appointment.dateTime)}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatTime(appointment.dateTime)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      {appointment.properties.map((item, i) => (
                        <Paper key={i} variant="outlined" sx={{ p: 1 }}>
                          <Stack spacing={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Chip label={item.order} size="small" color="primary" />
                              <Typography variant="body2">{item.property}</Typography>
                              <Chip
                                label={getPropertyStatusInfo(item.status).label}
                                color={getPropertyStatusInfo(item.status).color}
                                size="small"
                              />
                            </Stack>
                            <Typography variant="caption" color="textSecondary">
                              Thời gian xem: {formatTime(item.time)} {formatDate(item.time)}
                            </Typography>
                          </Stack>
                        </Paper>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>{appointment.customerName}</TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell>
                    <Chip label={getStatusInfo(appointment.status).label} color={getStatusInfo(appointment.status).color} size="small" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log('View details:', appointment.id);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          console.log('Edit appointment:', appointment.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredAppointments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Số dòng mỗi trang"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
        />
      </Box>
    </MainCard>
  );
};

export default AppointmentList;
