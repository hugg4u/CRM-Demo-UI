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
import { FilterList as FilterListIcon, Search as SearchIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Mock data for customers
const generateMockCustomers = () => {
  const statuses = [
    'Mới',
    'Đang tư vấn',
    'Đã xem nhà',
    'Đang đàm phán',
    'Đã đặt cọc',
    'Đã ký hợp đồng',
    'Không thành công',
    'Chăm sóc sau bán hàng'
  ];

  const sources = ['Facebook', 'Zalo', 'Website', 'Giới thiệu', 'Khác'];
  const creators = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'];
  const requirements = ['Mua để ở', 'Mua để đầu tư', 'Thuê để ở', 'Thuê để kinh doanh'];
  const budgets = ['Dưới 2 tỷ', '2-5 tỷ', '5-10 tỷ', 'Trên 10 tỷ'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Khách hàng ${index + 1}`,
    contact: `0987${Math.floor(Math.random() * 900000 + 100000)}`,
    requirements: requirements[Math.floor(Math.random() * requirements.length)],
    budget: budgets[Math.floor(Math.random() * budgets.length)],
    deadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    source: sources[Math.floor(Math.random() * sources.length)],
    introducedProperties: Math.floor(Math.random() * 5),
    feedback: 'Đang xem xét các phương án',
    evaluation: Math.floor(Math.random() * 5) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    afterSalesCount: Math.floor(Math.random() * 5)
  }));
};

const mockCustomers = generateMockCustomers();

const CustomerList = () => {
  // States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    creator: 'all',
    requirements: 'all',
    budget: 'all',
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

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Mới':
        return 'info';
      case 'Đang tư vấn':
        return 'primary';
      case 'Đã xem nhà':
        return 'secondary';
      case 'Đang đàm phán':
        return 'warning';
      case 'Đã đặt cọc':
        return 'success';
      case 'Đã ký hợp đồng':
        return 'success';
      case 'Không thành công':
        return 'error';
      case 'Chăm sóc sau bán hàng':
        return 'primary';
      default:
        return 'default';
    }
  };

  // Filter and sort customers
  const filteredCustomers = mockCustomers
    .filter((customer) => {
      if (filters.status !== 'all' && customer.status !== filters.status) return false;
      if (filters.source !== 'all' && customer.source !== filters.source) return false;
      if (filters.creator !== 'all' && customer.creator !== filters.creator) return false;
      if (filters.requirements !== 'all' && customer.requirements !== filters.requirements) return false;
      if (filters.budget !== 'all' && customer.budget !== filters.budget) return false;

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          customer.name.toLowerCase().includes(searchLower) ||
          customer.contact.toLowerCase().includes(searchLower) ||
          customer.creator.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Paginate customers
  const paginatedCustomers = filteredCustomers.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <MainCard title="Danh sách Khách hàng">
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Tổng số khách hàng: {filteredCustomers.length}</Typography>
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
              placeholder="Tìm kiếm khách hàng..."
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
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select value={filters.status} onChange={handleFilterChange('status')} label="Trạng thái">
                      <MenuItem value="all">Tất cả</MenuItem>
                      {[
                        'Mới',
                        'Đang tư vấn',
                        'Đã xem nhà',
                        'Đang đàm phán',
                        'Đã đặt cọc',
                        'Đã ký hợp đồng',
                        'Không thành công',
                        'Chăm sóc sau bán hàng'
                      ].map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Nguồn khách</InputLabel>
                    <Select value={filters.source} onChange={handleFilterChange('source')} label="Nguồn khách">
                      <MenuItem value="all">Tất cả</MenuItem>
                      {['Facebook', 'Zalo', 'Website', 'Giới thiệu', 'Khác'].map((source) => (
                        <MenuItem key={source} value={source}>
                          {source}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Người tạo</InputLabel>
                    <Select value={filters.creator} onChange={handleFilterChange('creator')} label="Người tạo">
                      <MenuItem value="all">Tất cả</MenuItem>
                      {['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'].map((creator) => (
                        <MenuItem key={creator} value={creator}>
                          {creator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Nhu cầu</InputLabel>
                    <Select value={filters.requirements} onChange={handleFilterChange('requirements')} label="Nhu cầu">
                      <MenuItem value="all">Tất cả</MenuItem>
                      {['Mua để ở', 'Mua để đầu tư', 'Thuê để ở', 'Thuê để kinh doanh'].map((req) => (
                        <MenuItem key={req} value={req}>
                          {req}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Tài chính</InputLabel>
                    <Select value={filters.budget} onChange={handleFilterChange('budget')} label="Tài chính">
                      <MenuItem value="all">Tất cả</MenuItem>
                      {['Dưới 2 tỷ', '2-5 tỷ', '5-10 tỷ', 'Trên 10 tỷ'].map((budget) => (
                        <MenuItem key={budget} value={budget}>
                          {budget}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Sắp xếp</InputLabel>
                    <Select value={filters.sort} onChange={handleFilterChange('sort')} label="Sắp xếp">
                      <MenuItem value="newest">Mới nhất</MenuItem>
                      <MenuItem value="oldest">Cũ nhất</MenuItem>
                      <MenuItem value="name">Theo tên</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Stack>
        </Card>

        {/* Customer Table */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Liên hệ</TableCell>
                <TableCell>Nhu cầu</TableCell>
                <TableCell>Tài chính</TableCell>
                <TableCell>Nguồn khách</TableCell>
                <TableCell>BĐS đã giới thiệu</TableCell>
                <TableCell>Người tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer, index) => (
                <TableRow key={customer.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.requirements}</TableCell>
                  <TableCell>{customer.budget}</TableCell>
                  <TableCell>{customer.source}</TableCell>
                  <TableCell align="center">{customer.introducedProperties}</TableCell>
                  <TableCell>{customer.creator}</TableCell>
                  <TableCell>
                    <Chip label={customer.status} color={getStatusColor(customer.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        // Handle view details
                        console.log('View details:', customer.id);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredCustomers.length}
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

export default CustomerList;
