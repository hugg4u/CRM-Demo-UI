import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Stack,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import MainCard from 'components/MainCard';

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

const TransactionCreate = () => {
  const [formData, setFormData] = useState({
    propertyId: null,
    customerId: null,
    transactionType: 'sale', // sale, rent, transfer
    status: 'pending',
    price: '',
    deposit: '',
    commission: '',
    commissionType: 'percentage',
    contractDate: '',
    depositDate: '',
    handoverDate: '',
    note: '',
    documents: [],
    paymentSchedule: []
  });

  const [paymentEntry, setPaymentEntry] = useState({
    date: '',
    amount: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePropertyChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      propertyId: newValue
    }));
  };

  const handleCustomerChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      customerId: newValue
    }));
  };

  const handlePaymentEntryChange = (event) => {
    const { name, value } = event.target;
    setPaymentEntry((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addPaymentSchedule = () => {
    if (paymentEntry.date && paymentEntry.amount) {
      setFormData((prev) => ({
        ...prev,
        paymentSchedule: [...prev.paymentSchedule, { ...paymentEntry }]
      }));
      setPaymentEntry({
        date: '',
        amount: '',
        description: ''
      });
    }
  };

  const removePaymentSchedule = (index) => {
    setFormData((prev) => ({
      ...prev,
      paymentSchedule: prev.paymentSchedule.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here
  };

  return (
    <MainCard title="Tạo Giao Dịch Mới">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Bất động sản */}
          <Grid item xs={12} width="100%">
            <Autocomplete
              fullWidth
              options={mockProperties}
              getOptionLabel={(option) => option.title}
              value={formData.propertyId}
              onChange={handlePropertyChange}
              renderInput={(params) => <TextField {...params} label="Bất động sản" required />}
            />
          </Grid>

          {/* Khách hàng */}
          <Grid item xs={12} width="100%">
            <Autocomplete
              fullWidth
              options={mockCustomers}
              getOptionLabel={(option) => option.name}
              value={formData.customerId}
              onChange={handleCustomerChange}
              renderInput={(params) => <TextField {...params} label="Khách hàng" required />}
            />
          </Grid>

          {/* Loại giao dịch */}
          <Grid item xs={12} width="100%">
            <FormControl component="fieldset">
              <FormLabel component="legend">Loại giao dịch</FormLabel>
              <RadioGroup row name="transactionType" value={formData.transactionType} onChange={handleChange}>
                <FormControlLabel value="sale" control={<Radio />} label="Mua" />
                <FormControlLabel value="rent" control={<Radio />} label="Thuê" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Giá */}
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Giá" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Ngày"
              name="date"
              type="date"
              value={paymentEntry.date}
              onChange={handlePaymentEntryChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Ghi chú */}
          <Grid item xs={12} width="100%">
            <TextField fullWidth label="Ghi chú" name="note" multiline rows={4} value={formData.note} onChange={handleChange} />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Tạo Giao Dịch
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default TransactionCreate;
