import {
  FilterList as FilterListIcon,
  GridView as GridViewIcon,
  List as ListViewIcon,
  Search as SearchIcon,
  ViewList as TableViewIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
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
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';

// Mock data
const generateMockData = () => {
  const streets = ['Võ Thị Sáu', 'Nguyễn Thị Minh Khai', 'Lê Văn Sỹ', 'Trần Hưng Đạo', 'Điện Biên Phủ'];
  const districts = ['Quận 1', 'Quận 3', 'Quận Phú Nhuận', 'Quận Bình Thạnh', 'Quận Tân Bình'];
  const wards = ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5'];
  const notes = [
    'Nhà đẹp mới xây, có Thang máy',
    'Vị trí đắc địa, kinh doanh tốt',
    'Khu dân cư an ninh, yên tĩnh',
    'Gần trường học, chợ, tiện ích đầy đủ',
    'Đường rộng, xe hơi vào tận nhà'
  ];
  const statuses = ['Đã có sổ', 'Đang chờ sổ', 'Giấy tờ hợp lệ', 'HĐMB công chứng'];
  const periods = ['1-3 năm', '3-5 năm', '5-10 năm', 'Thương lượng'];
  const labels = [['hot'], ['vip'], ['hot', 'vip'], []];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Nhà phố ${Math.floor(Math.random() * 5) + 2} tầng mặt tiền`,
    type: ['sell', 'rent', 'transfer'][Math.floor(Math.random() * 3)],
    category: ['house', 'land', 'apartment', 'office', 'retail'][Math.floor(Math.random() * 5)],
    price: Math.floor(Math.random() * 20000000000) + 2000000000,
    area: Math.floor(Math.random() * 200) + 50,
    address: `${Math.floor(Math.random() * 200) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${
      wards[Math.floor(Math.random() * wards.length)]
    }, ${districts[Math.floor(Math.random() * districts.length)]}`,
    bedrooms: Math.floor(Math.random() * 5) + 1,
    bathrooms: Math.floor(Math.random() * 4) + 1,
    direction: ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Nam', 'Đông Bắc', 'Tây Nam', 'Tây Bắc'][Math.floor(Math.random() * 8)],
    status: ['available', 'deposited', 'sold'][Math.floor(Math.random() * 3)],
    labels: labels[Math.floor(Math.random() * labels.length)],
    images: [
      'https://picsum.photos/200/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/200/300'
    ],
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    rentalPeriod: periods[Math.floor(Math.random() * periods.length)],
    legalStatus: statuses[Math.floor(Math.random() * statuses.length)],
    brokerageFee: ['1%', '1.5%', '2%', '2.5%', '3%'][Math.floor(Math.random() * 5)],
    note: notes[Math.floor(Math.random() * notes.length)]
  }));
};

const mockProperties = generateMockData();

const PropertyList = () => {
  // States
  const [viewMode, setViewMode] = useState('table');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    priceRange: 'all',
    area: 'all',
    status: 'all',
    sort: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handlers
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleFilterChange = (name) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [name]: event.target.value
    }));
    setPage(0); // Reset to first page when filter changes
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and sort properties
  const filteredProperties = mockProperties
    .filter((property) => {
      if (filters.type !== 'all' && property.type !== filters.type) return false;
      if (filters.category !== 'all' && property.category !== filters.category) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.address.toLowerCase().includes(searchLower) ||
          property.note.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'oldest':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-asc':
          return a.area - b.area;
        case 'area-desc':
          return b.area - a.area;
        default:
          return 0;
      }
    });

  // Paginate properties
  const paginatedProperties = filteredProperties.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Render property card
  const PropertyCard = ({ property }) => (
    <Card>
      <CardMedia component="img" height="200" image={property.images[0]} alt={property.title} sx={{ objectFit: 'cover' }} />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" noWrap>
            {property.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {property.labels.map((label) => (
              <Chip
                key={label}
                label={label.toUpperCase()}
                color={label === 'hot' ? 'error' : label === 'vip' ? 'primary' : 'default'}
                size="small"
              />
            ))}
          </Stack>
          <Typography variant="h5" color="primary">
            {property.price.toLocaleString('vi-VN')} VNĐ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.address}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Diện tích: {property.area}m²</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Phòng ngủ: {property.bedrooms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Phòng tắm: {property.bathrooms}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Hướng: {property.direction}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );

  // Render property table
  const PropertyTable = () => (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="property table">
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Thời gian cho thuê</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thời hạn</TableCell>
              <TableCell>STT</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProperties.map((property, index) => (
              <TableRow key={property.id}>
                <TableCell>{formatDate(property.updatedAt)}</TableCell>
                <TableCell>
                  <img src={property.images[0]} alt={property.title} style={{ width: 100, height: 75, objectFit: 'cover' }} />
                </TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.price.toLocaleString('vi-VN')} VNĐ</TableCell>
                <TableCell>{property.legalStatus}</TableCell>
                <TableCell>{property.rentalPeriod}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {property.labels.map((label) => (
                      <Chip
                        key={label}
                        label={label.toUpperCase()}
                        color={label === 'hot' ? 'error' : label === 'vip' ? 'primary' : 'default'}
                        size="small"
                      />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>{property.brokerageFee}</TableCell>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{property.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ py: 3 }}>
        <TablePagination
          component="div"
          count={filteredProperties.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Số dòng mỗi trang"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
        />
      </Box>
    </>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Danh sách Bất động sản ({filteredProperties.length})</Typography>
        <Stack direction="row" spacing={2}>
          <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange} aria-label="view mode">
            {/* <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListViewIcon />
            </ToggleButton> */}
            {/* <ToggleButton value="table" aria-label="table view">
              <TableViewIcon />
            </ToggleButton> */}
          </ToggleButtonGroup>
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={toggleFilters}>
            Bộ lọc
          </Button>
        </Stack>
      </Stack>

      {/* Search and Filters */}
      <MainCard sx={{ mb: 3 }}>
        <Stack spacing={3}>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Tìm kiếm bất động sản..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0); // Reset to first page when searching
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
                  <InputLabel>Loại BĐS</InputLabel>
                  <Select value={filters.type} onChange={handleFilterChange('type')} label="Loại BĐS">
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="sell">Bán</MenuItem>
                    <MenuItem value="rent">Cho thuê</MenuItem>
                    <MenuItem value="transfer">Sang nhượng</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Dạng BĐS</InputLabel>
                  <Select value={filters.category} onChange={handleFilterChange('category')} label="Dạng BĐS">
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="house">Nhà phố</MenuItem>
                    <MenuItem value="land">Đất</MenuItem>
                    <MenuItem value="apartment">Căn hộ</MenuItem>
                    <MenuItem value="office">Văn phòng</MenuItem>
                    <MenuItem value="retail">Mặt bằng</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Khoảng giá</InputLabel>
                  <Select value={filters.priceRange} onChange={handleFilterChange('priceRange')} label="Khoảng giá">
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="0-2">Dưới 2 tỷ</MenuItem>
                    <MenuItem value="2-5">2 - 5 tỷ</MenuItem>
                    <MenuItem value="5-10">5 - 10 tỷ</MenuItem>
                    <MenuItem value="10+">Trên 10 tỷ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sắp xếp</InputLabel>
                  <Select value={filters.sort} onChange={handleFilterChange('sort')} label="Sắp xếp">
                    <MenuItem value="newest">Mới nhất</MenuItem>
                    <MenuItem value="oldest">Cũ nhất</MenuItem>
                    <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                    <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                    <MenuItem value="area-asc">Diện tích tăng dần</MenuItem>
                    <MenuItem value="area-desc">Diện tích giảm dần</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Stack>
      </MainCard>

      {/* Property List */}
      {viewMode === 'table' ? (
        <PropertyTable />
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedProperties.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ py: 3 }}>
            <TablePagination
              component="div"
              count={filteredProperties.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelRowsPerPage="Số dòng mỗi trang"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PropertyList;
