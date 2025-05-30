import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  Stack,
  Autocomplete,
  Typography,
  Paper,
  IconButton,
  Chip,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import vi from 'date-fns/locale/vi';

// Mock data for property suggestions
const mockProperties = [
  { id: 1, title: 'Nhà phố Võ Thị Sáu' },
  { id: 2, title: 'Căn hộ Nguyễn Thị Minh Khai' },
  { id: 3, title: 'Đất nền Lê Văn Sỹ' }
];

// Mock data for customer suggestions
const mockCustomers = [
  { id: 1, name: 'Nguyễn Văn A' },
  { id: 2, name: 'Trần Thị B' },
  { id: 3, name: 'Lê Văn C' }
];

const AppointmentCreate = () => {
  const [formData, setFormData] = useState({
    customerId: null,
    dateTime: new Date(),
    location: '',
    purpose: '',
    note: '',
    status: 'pending',
    properties: [] // Array of properties with order, time and status
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      dateTime: newValue
    }));
  };

  const handleCustomerChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      customerId: newValue
    }));
  };

  const handleAddProperty = (event, newValue) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        properties: [
          ...prev.properties,
          {
            property: newValue,
            order: prev.properties.length + 1,
            time: new Date(prev.dateTime.getTime() + prev.properties.length * 60 * 60 * 1000), // Add 1 hour for each property
            status: 'pending' // pending, confirmed, rejected
          }
        ]
      }));
    }
  };

  const handleRemoveProperty = (index) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index).map((item, i) => ({ ...item, order: i + 1 }))
    }));
  };

  const handlePropertyTimeChange = (index, newValue) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.map((item, i) => (i === index ? { ...item, time: newValue } : item))
    }));
  };

  const handlePropertyStatusChange = (index, event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.map((item, i) => (i === index ? { ...item, status: value } : item))
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Chờ xác nhận';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here
  };

  return (
    <MainCard title="Tạo Lịch Hẹn">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Khách hàng */}
          <Grid item xs={12} md={6} width="100%">
            <Autocomplete
              fullWidth
              options={mockCustomers}
              getOptionLabel={(option) => option.name}
              value={formData.customerId}
              onChange={handleCustomerChange}
              renderInput={(params) => <TextField {...params} label="Khách hàng" required />}
            />
          </Grid>

          {/* Thời gian bắt đầu */}
          <Grid item xs={12} md={6} width="100%">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
              <DateTimePicker
                label="Thời gian bắt đầu"
                value={formData.dateTime}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Danh sách bất động sản */}
          <Grid item xs={12} width="100%">
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Danh sách bất động sản xem (theo thứ tự)
              </Typography>

              {/* Existing properties */}
              <Stack spacing={2} sx={{ mb: 2 }}>
                {formData.properties.map((item, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label={`${index + 1}`} size="small" color="primary" />
                        <Typography flex={1}>{item.property.title}</Typography>
                        <IconButton size="small" color="error" onClick={() => handleRemoveProperty(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        {/* Thời gian xem */}
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                          <DateTimePicker
                            label="Thời gian xem"
                            value={item.time}
                            onChange={(newValue) => handlePropertyTimeChange(index, newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth required />}
                          />
                        </LocalizationProvider>

                        {/* Trạng thái xác nhận */}
                        {/* <FormControl fullWidth>
                          <InputLabel>Trạng thái</InputLabel>
                          <Select value={item.status} onChange={(e) => handlePropertyStatusChange(index, e)} label="Trạng thái">
                            <MenuItem value="pending">Chờ xác nhận</MenuItem>
                            <MenuItem value="confirmed">Đã xác nhận</MenuItem>
                            <MenuItem value="rejected">Từ chối</MenuItem>
                          </Select>
                        </FormControl> */}
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>

              {/* Add new property */}
              <Autocomplete
                fullWidth
                options={mockProperties.filter((property) => !formData.properties.some((item) => item.property.id === property.id))}
                getOptionLabel={(option) => option.title}
                onChange={handleAddProperty}
                renderInput={(params) => <TextField {...params} label="Thêm bất động sản" />}
                value={null}
              />
            </Paper>
          </Grid>

          {/* Ghi chú */}
          <Grid item xs={12} width="100%">
            <TextField fullWidth label="Ghi chú" name="note" multiline rows={4} value={formData.note} onChange={handleChange} />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Tạo Lịch Hẹn
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default AppointmentCreate;
