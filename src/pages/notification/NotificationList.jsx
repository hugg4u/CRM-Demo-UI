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
  Chip
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Generate mock data
const generateMockNotifications = () => {
  const types = ['info', 'warning', 'success', 'error'];
  const priorities = ['low', 'normal', 'high', 'urgent'];
  const titles = ['Cập nhật thông tin BĐS', 'Lịch hẹn mới', 'Giao dịch thành công', 'Nhắc nhở thanh toán', 'Thông báo bảo trì hệ thống'];
  const statuses = ['active', 'scheduled', 'sent', 'draft'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: titles[Math.floor(Math.random() * titles.length)],
    content: 'Nội dung thông báo...',
    type: types[Math.floor(Math.random() * types.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    isScheduled: Math.random() > 0.5,
    scheduledTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    sentAt: null,
    readCount: Math.floor(Math.random() * 100),
    action: Math.random() > 0.5 ? 'Xem chi tiết' : null,
    actionUrl: '/some-url'
  }));
};

const mockNotifications = generateMockNotifications();

const NotificationList = () => {
  // States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all',
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

  // Get type info
  const getTypeInfo = (type) => {
    switch (type) {
      case 'info':
        return { color: 'info', label: 'Thông tin' };
      case 'warning':
        return { color: 'warning', label: 'Cảnh báo' };
      case 'success':
        return { color: 'success', label: 'Thành công' };
      case 'error':
        return { color: 'error', label: 'Lỗi' };
      default:
        return { color: 'default', label: type };
    }
  };

  // Get priority info
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'low':
        return { color: 'default', label: 'Thấp' };
      case 'normal':
        return { color: 'primary', label: 'Bình thường' };
      case 'high':
        return { color: 'warning', label: 'Cao' };
      case 'urgent':
        return { color: 'error', label: 'Khẩn cấp' };
      default:
        return { color: 'default', label: priority };
    }
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { color: 'success', label: 'Đang hoạt động' };
      case 'scheduled':
        return { color: 'info', label: 'Đã lên lịch' };
      case 'sent':
        return { color: 'primary', label: 'Đã gửi' };
      case 'draft':
        return { color: 'default', label: 'Bản nháp' };
      default:
        return { color: 'default', label: status };
    }
  };

  // Filter and sort notifications
  const filteredNotifications = mockNotifications
    .filter((notification) => {
      if (filters.type !== 'all' && notification.type !== filters.type) return false;
      if (filters.priority !== 'all' && notification.priority !== filters.priority) return false;
      if (filters.status !== 'all' && notification.status !== filters.status) return false;

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return notification.title.toLowerCase().includes(searchLower) || notification.content.toLowerCase().includes(searchLower);
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  // Paginate notifications
  const paginatedNotifications = filteredNotifications.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <MainCard title="Danh sách Thông báo">
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Tổng số thông báo: {filteredNotifications.length}</Typography>
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
              placeholder="Tìm kiếm thông báo..."
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

        {/* Notifications Table */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Người nhận</TableCell>
                <TableCell>Đã đọc</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedNotifications.map((notification, index) => (
                <TableRow key={notification.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.title}</Typography>
                    {notification.action && (
                      <Typography variant="caption" color="primary">
                        {notification.action}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.content}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.recipients}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{notification.readCount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(notification.createdAt)}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTime(notification.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log('View details:', notification.id);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          console.log('Edit notification:', notification.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          console.log('Delete notification:', notification.id);
                        }}
                      >
                        <DeleteIcon />
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
          count={filteredNotifications.length}
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

export default NotificationList;
