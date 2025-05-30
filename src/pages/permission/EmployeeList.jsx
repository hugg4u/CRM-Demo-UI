import { useState, useMemo } from 'react';

// material-ui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  Tooltip,
  Switch,
  TablePagination
} from '@mui/material';

// icons
import { EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

// project imports
import MainCard from 'components/MainCard';

// Mock data
const mockEmployees = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    position: 'Sale',
    department: 'Phòng kinh doanh',
    contact: 'nguyenvana@email.com',
    permissions: {
      library: true,
      fullEmployee: false,
      priceLimit: { enabled: true, min: 1000000, max: 5000000 }
    },
    isLocked: false,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    position: 'Admin',
    department: 'Phòng IT',
    contact: 'tranthib@email.com',
    permissions: {
      library: true,
      fullEmployee: true,
      priceLimit: { enabled: false, min: '', max: '' }
    },
    isLocked: false,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    position: 'Manager',
    department: 'Phòng kinh doanh',
    contact: 'levanc@email.com',
    permissions: {
      library: true,
      fullEmployee: true,
      priceLimit: { enabled: false, min: '', max: '' }
    },
    isLocked: false,
    createdAt: '2024-01-05'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    position: 'Employee',
    department: 'Phòng marketing',
    contact: 'phamthid@email.com',
    permissions: {
      library: false,
      fullEmployee: false,
      priceLimit: { enabled: true, min: 500000, max: 2000000 }
    },
    isLocked: true,
    createdAt: '2024-01-20'
  }
];

// ==============================|| EMPLOYEE LIST ||============================== //

export default function EmployeeList() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [selected, setSelected] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkPermissions, setBulkPermissions] = useState({
    library: false,
    fullEmployee: false,
    priceLimit: {
      enabled: false,
      min: '',
      max: ''
    }
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [success, setSuccess] = useState(false);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(employees.map((emp) => emp.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleLockToggle = (id) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, isLocked: !emp.isLocked } : emp)));
  };

  const handleBulkPermissionChange = (permission) => (event) => {
    setBulkPermissions((prev) => ({
      ...prev,
      [permission]: event.target.checked
    }));
  };

  const handlePriceLimitChange = (field) => (event) => {
    setBulkPermissions((prev) => ({
      ...prev,
      priceLimit: {
        ...prev.priceLimit,
        [field]: event.target.value
      }
    }));
  };

  const handleBulkUpdate = () => {
    setEmployees((prev) => prev.map((emp) => (selected.includes(emp.id) ? { ...emp, permissions: { ...bulkPermissions } } : emp)));

    setDialogOpen(false);
    setSelected([]);
    setBulkPermissions({
      library: false,
      fullEmployee: false,
      priceLimit: {
        enabled: false,
        min: '',
        max: ''
      }
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const getPermissionChips = (permissions) => {
    const chips = [];

    if (permissions.library) {
      chips.push(<Chip key="library" label="Thử việc" size="small" color="primary" />);
    }

    if (permissions.fullEmployee) {
      chips.push(<Chip key="fullEmployee" label="Nhân viên chính thức" size="small" color="success" />);
    }

    if (permissions.priceLimit.enabled) {
      chips.push(
        <Chip
          key="priceLimit"
          label={`Giới hạn giá: ${permissions.priceLimit.min?.toLocaleString()} - ${permissions.priceLimit.max?.toLocaleString()} VNĐ`}
          size="small"
          color="warning"
        />
      );
    }

    return chips.length > 0 ? chips : [<Chip key="none" label="Không có quyền" size="small" color="default" />];
  };

  const isSelected = (id) => selected.includes(id);
  const selectedCount = selected.length;

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = useMemo(() => {
    return employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [employees, page, rowsPerPage]);

  return (
    <MainCard>
      <Typography variant="h4" gutterBottom>
        Danh Sách Nhân Viên
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Cập nhật quyền thành công cho {selectedCount} nhân viên!
        </Alert>
      )}

      {/* Actions */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {selectedCount > 0 ? `Đã chọn ${selectedCount} nhân viên` : 'Chọn nhân viên để cập nhật quyền'}
        </Typography>

        <Button variant="contained" disabled={selectedCount === 0} onClick={() => setDialogOpen(true)}>
          Cập nhật quyền
        </Button>
      </Box>

      {/* Employee Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedCount > 0 && selectedCount < employees.length}
                  checked={employees.length > 0 && selectedCount === employees.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Chức danh</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Liên hệ</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee) => {
              const isItemSelected = isSelected(employee.id);

              return (
                <TableRow
                  key={employee.id}
                  hover
                  onClick={() => handleSelect(employee.id)}
                  role="checkbox"
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {employee.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {employee.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.contact}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{getPermissionChips(employee.permissions)}</Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch checked={!employee.isLocked} onChange={() => handleLockToggle(employee.id)} size="small" />
                      <Typography variant="caption">{employee.isLocked ? 'Khóa' : 'Hoạt động'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton size="small">
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={employee.isLocked ? 'Mở khóa' : 'Khóa tài khoản'}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLockToggle(employee.id);
                          }}
                        >
                          {employee.isLocked ? <UnlockOutlined /> : <LockOutlined />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" color="error">
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
        />
      </TableContainer>

      {/* Bulk Permission Update Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Cập nhật quyền cho {selectedCount} nhân viên</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Quyền truy cập</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={bulkPermissions.library} onChange={handleBulkPermissionChange('library')} />}
                  label="Thử việc"
                />

                <FormControlLabel
                  control={<Checkbox checked={bulkPermissions.fullEmployee} onChange={handleBulkPermissionChange('fullEmployee')} />}
                  label="Nhân viên chính thức"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={bulkPermissions.priceLimit.enabled}
                      onChange={(e) =>
                        setBulkPermissions((prev) => ({
                          ...prev,
                          priceLimit: {
                            ...prev.priceLimit,
                            enabled: e.target.checked
                          }
                        }))
                      }
                    />
                  }
                  label="Giới hạn thông tin giá"
                />
              </FormGroup>
            </FormControl>

            {bulkPermissions.priceLimit.enabled && (
              <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Giới hạn giá từ ... đến ...
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Giá từ"
                      type="number"
                      value={bulkPermissions.priceLimit.min}
                      onChange={handlePriceLimitChange('min')}
                      InputProps={{
                        endAdornment: 'VNĐ'
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Đến"
                      type="number"
                      value={bulkPermissions.priceLimit.max}
                      onChange={handlePriceLimitChange('max')}
                      InputProps={{
                        endAdornment: 'VNĐ'
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleBulkUpdate} variant="contained">
            Cập nhật quyền
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}
