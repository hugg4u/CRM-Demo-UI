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
import { FilterList as FilterListIcon, Search as SearchIcon, Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Generate mock data
const generateMockTransactions = () => {
  const types = ['sale', 'rent'];
  const statuses = ['pending', 'deposit', 'contract', 'completed', 'cancelled'];
  const properties = ['Nhà phố Võ Thị Sáu', 'Căn hộ Nguyễn Thị Minh Khai', 'Đất nền Lê Văn Sỹ'];
  const customers = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    propertyName: properties[Math.floor(Math.random() * properties.length)],
    customerName: customers[Math.floor(Math.random() * customers.length)],
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    price: Math.floor(Math.random() * 20000000000) + 2000000000,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const mockTransactions = generateMockTransactions();

const TransactionList = () => {
  // States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
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

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
  };

  // Get status color and label
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'warning', label: 'Đang xử lý' };
      case 'deposit':
        return { color: 'info', label: 'Đã đặt cọc' };
      case 'contract':
        return { color: 'primary', label: 'Đã ký HĐ' };
      case 'completed':
        return { color: 'success', label: 'Hoàn thành' };
      case 'cancelled':
        return { color: 'error', label: 'Đã hủy' };
      default:
        return { color: 'default', label: status };
    }
  };

  // Get transaction type label
  const getTypeLabel = (type) => {
    switch (type) {
      case 'sale':
        return 'Mua';
      case 'rent':
        return 'Thuê';
    }
  };

  // Filter and sort transactions
  const filteredTransactions = mockTransactions
    .filter((transaction) => {
      if (filters.type !== 'all' && transaction.type !== filters.type) return false;
      if (filters.status !== 'all' && transaction.status !== filters.status) return false;

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return transaction.propertyName.toLowerCase().includes(searchLower) || transaction.customerName.toLowerCase().includes(searchLower);
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <MainCard title="Danh sách Giao dịch">
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Tổng số giao dịch: {filteredTransactions.length}</Typography>
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
              placeholder="Tìm kiếm giao dịch..."
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
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Loại giao dịch</InputLabel>
                    <Select value={filters.type} onChange={handleFilterChange('type')} label="Loại giao dịch">
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="sale">Bán</MenuItem>
                      <MenuItem value="rent">Cho thuê</MenuItem>
                      <MenuItem value="transfer">Sang nhượng</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select value={filters.status} onChange={handleFilterChange('status')} label="Trạng thái">
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="pending">Đang xử lý</MenuItem>
                      <MenuItem value="deposit">Đã đặt cọc</MenuItem>
                      <MenuItem value="contract">Đã ký HĐ</MenuItem>
                      <MenuItem value="completed">Hoàn thành</MenuItem>
                      <MenuItem value="cancelled">Đã hủy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Sắp xếp</InputLabel>
                    <Select value={filters.sort} onChange={handleFilterChange('sort')} label="Sắp xếp">
                      <MenuItem value="newest">Mới nhất</MenuItem>
                      <MenuItem value="oldest">Cũ nhất</MenuItem>
                      <MenuItem value="price-high">Giá cao nhất</MenuItem>
                      <MenuItem value="price-low">Giá thấp nhất</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Stack>
        </Card>

        {/* Transactions Table */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Bất động sản</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction, index) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                  <TableCell>{transaction.propertyName}</TableCell>
                  <TableCell>{transaction.customerName}</TableCell>
                  <TableCell>{getTypeLabel(transaction.type)}</TableCell>
                  <TableCell>{formatCurrency(transaction.price)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          console.log('View details:', transaction.id);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          console.log('Edit transaction:', transaction.id);
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
          count={filteredTransactions.length}
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

export default TransactionList;
