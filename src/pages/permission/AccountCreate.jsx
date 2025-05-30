import { useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  Typography,
  Alert
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT CREATE ||============================== //

export default function AccountCreate() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    contact: '',
    password: '',
    confirmPassword: '',
    permissions: {
      library: false,
      fullEmployee: false,
      priceLimit: {
        enabled: false,
        min: '',
        max: ''
      }
    }
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const positions = [
    { value: 'sale', label: 'Sale' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'employee', label: 'Employee' }
  ];

  const departments = [
    { value: 'sales', label: 'Phòng kinh doanh' },
    { value: 'marketing', label: 'Phòng marketing' },
    { value: 'hr', label: 'Phòng nhân sự' },
    { value: 'finance', label: 'Phòng tài chính' },
    { value: 'it', label: 'Phòng IT' }
  ];

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permission) => (event) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: event.target.checked
      }
    }));
  };

  const handlePriceLimitChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        priceLimit: {
          ...prev.permissions.priceLimit,
          [field]: event.target.value
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên là bắt buộc';
    }

    if (!formData.position) {
      newErrors.position = 'Chức danh là bắt buộc';
    }

    if (!formData.department) {
      newErrors.department = 'Vị trí phòng ban là bắt buộc';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Liên hệ là bắt buộc';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không khớp';
    }

    if (formData.permissions.priceLimit.enabled) {
      if (!formData.permissions.priceLimit.min) {
        newErrors.priceMin = 'Giá tối thiểu là bắt buộc';
      }
      if (!formData.permissions.priceLimit.max) {
        newErrors.priceMax = 'Giá tối đa là bắt buộc';
      }
      if (formData.permissions.priceLimit.min && formData.permissions.priceLimit.max) {
        const min = parseFloat(formData.permissions.priceLimit.min);
        const max = parseFloat(formData.permissions.priceLimit.max);
        if (min >= max) {
          newErrors.priceMax = 'Giá tối đa phải lớn hơn giá tối thiểu';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      setSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          position: '',
          department: '',
          contact: '',
          password: '',
          confirmPassword: '',
          permissions: {
            library: false,
            fullEmployee: false,
            priceLimit: {
              enabled: false,
              min: '',
              max: ''
            }
          }
        });
        setSuccess(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      position: '',
      department: '',
      contact: '',
      password: '',
      confirmPassword: '',
      permissions: {
        library: false,
        fullEmployee: false,
        priceLimit: {
          enabled: false,
          min: '',
          max: ''
        }
      }
    });
    setErrors({});
    setSuccess(false);
  };

  return (
    <MainCard>
      <Typography variant="h4" gutterBottom>
        Tạo Tài Khoản Mới
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Tài khoản đã được tạo thành công!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {/* Account Information */}
          <Grid item xs={12}>
            <div style={{ width: '100%' }}>
              <CardHeader title="Thông tin tài khoản" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} width="100%">
                    <TextField
                      fullWidth
                      label="Tên"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6} width="100%">
                    <FormControl fullWidth error={!!errors.position} sx={{ width: '100%' }}>
                      <InputLabel>Chức danh</InputLabel>
                      <Select value={formData.position} onChange={handleInputChange('position')} label="Chức danh" required>
                        {positions.map((position) => (
                          <MenuItem key={position.value} value={position.value}>
                            {position.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.position && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.position}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!errors.department} sx={{ width: '100%' }}>
                      <InputLabel>Vị trí phòng ban</InputLabel>
                      <Select value={formData.department} onChange={handleInputChange('department')} label="Vị trí phòng ban" required>
                        {departments.map((dept) => (
                          <MenuItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.department && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.department}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Liên hệ"
                      value={formData.contact}
                      onChange={handleInputChange('contact')}
                      error={!!errors.contact}
                      helperText={errors.contact}
                      placeholder="Email hoặc số điện thoại"
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Grid>

          {/* Permissions */}
          <div style={{ width: '100%' }}>
            <CardHeader title="Phân quyền" />
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">Quyền truy cập</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={formData.permissions.library} onChange={handlePermissionChange('library')} />}
                    label="Thử việc"
                  />

                  <FormControlLabel
                    control={<Checkbox checked={formData.permissions.fullEmployee} onChange={handlePermissionChange('fullEmployee')} />}
                    label="Nhân viên chính thức"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.permissions.priceLimit.enabled}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            permissions: {
                              ...prev.permissions,
                              priceLimit: {
                                ...prev.permissions.priceLimit,
                                enabled: e.target.checked
                              }
                            }
                          }))
                        }
                      />
                    }
                    label="Giới hạn thông tin giá"
                  />
                </FormGroup>
              </FormControl>

              {formData.permissions.priceLimit.enabled && (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Giới hạn giá từ ... đến ...
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Giá từ"
                        type="number"
                        value={formData.permissions.priceLimit.min}
                        onChange={handlePriceLimitChange('min')}
                        error={!!errors.priceMin}
                        helperText={errors.priceMin}
                        InputProps={{
                          endAdornment: 'VNĐ'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Đến"
                        type="number"
                        value={formData.permissions.priceLimit.max}
                        onChange={handlePriceLimitChange('max')}
                        error={!!errors.priceMax}
                        helperText={errors.priceMax}
                        InputProps={{
                          endAdornment: 'VNĐ'
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </CardContent>
          </div>
        </Grid>

        {/* Password */}
        <Grid item xs={12}>
          <CardHeader title="Mật khẩu" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={handleReset} size="large">
              Đặt lại
            </Button>
            <Button type="submit" variant="contained" size="large">
              Tạo tài khoản
            </Button>
          </Box>
        </Grid>
      </Box>
    </MainCard>
  );
}
