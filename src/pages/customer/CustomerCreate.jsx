import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Autocomplete,
  IconButton,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Mock data for property suggestions
const mockProperties = [
  { id: 1, title: 'Nhà phố Võ Thị Sáu' },
  { id: 2, title: 'Căn hộ Nguyễn Thị Minh Khai' },
  { id: 3, title: 'Đất nền Lê Văn Sỹ' }
];

// Customer status options
const customerStatuses = [
  'Mới',
  'Đang tư vấn',
  'Đã xem nhà',
  'Đang đàm phán',
  'Đã đặt cọc',
  'Đã ký hợp đồng',
  'Không thành công',
  'Chăm sóc sau bán hàng'
];

const CustomerCreate = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    requirements: '',
    budget: '',
    deadline: '',
    source: '',
    introducedProperties: [],
    feedback: '',
    evaluation: '',
    creator: '',
    status: 'Mới',
    afterSales: []
  });

  // State for after-sales entries
  const [afterSaleEntry, setAfterSaleEntry] = useState({
    month: '',
    day: '',
    name: '',
    description: ''
  });

  // Handle text field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle property selection
  const handlePropertyChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      introducedProperties: newValue
    }));
  };

  // Handle after-sales entry
  const handleAfterSaleEntryChange = (event) => {
    const { name, value } = event.target;
    setAfterSaleEntry((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add after-sales entry
  const addAfterSaleEntry = () => {
    if (afterSaleEntry.month && afterSaleEntry.day && afterSaleEntry.name) {
      setFormData((prev) => ({
        ...prev,
        afterSales: [...prev.afterSales, { ...afterSaleEntry }]
      }));
      setAfterSaleEntry({
        month: '',
        day: '',
        name: '',
        description: ''
      });
    }
  };

  // Remove after-sales entry
  const removeAfterSaleEntry = (index) => {
    setFormData((prev) => ({
      ...prev,
      afterSales: prev.afterSales.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here
  };

  return (
    <MainCard title="Tạo Khách Hàng Mới">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Tên khách hàng */}
          <Grid item xs={12} width="100%">
            <TextField required fullWidth label="Tên khách hàng" name="name" value={formData.name} onChange={handleChange} />
          </Grid>

          {/* Giới tính */}
          <Grid item xs={12} width="100%">
            <FormControl component="fieldset">
              <FormLabel component="legend">Giới tính</FormLabel>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Số điện thoại */}
          <Grid item xs={12} width="100%">
            <TextField required fullWidth label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
          </Grid>

          {/* Liên hệ */}
          <Grid item xs={12} width="100%">
            <TextField
              fullWidth
              label="Thông tin liên hệ"
              name="contact"
              multiline
              rows={4}
              value={formData.contact}
              onChange={handleChange}
            />
          </Grid>

          {/* Ghi chú mạng xã hội */}
          <Grid item xs={12} width="100%">
            <TextField
              fullWidth
              label="Ghi chú mạng xã hội"
              name="socialMediaNote"
              value={formData.socialMediaNote}
              onChange={handleChange}
            />
          </Grid>

          {/* Loại khách hàng */}
          <Grid item xs={12} width="100%">
            <FormControl component="fieldset">
              <FormLabel component="legend">Loại khách hàng</FormLabel>
              <RadioGroup row name="customerType" value={formData.customerType} onChange={handleChange}>
                <FormControlLabel value="buy" control={<Radio />} label="Khách mua" />
                <FormControlLabel value="rent" control={<Radio />} label="Khách thuê" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Chủ nhà */}
          <Grid item xs={12} width="100%" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">Chủ nhà</Typography>
            <FormControlLabel control={<Checkbox />} />
          </Grid>

          {/* Nhu cầu */}
          <Grid item xs={12} width="100%">
            <TextField
              fullWidth
              label="Nhu cầu"
              name="requirements"
              multiline
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
            />
          </Grid>

          {/* Tài chính */}
          <Grid item xs={12} md={6}>
            <TextField type="number" fullWidth label="Tài chính" name="budget" value={formData.budget} onChange={handleChange} />
          </Grid>

          {/* Thời hạn */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Thời hạn cuối thuê/mua"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Nguồn khách */}
          <Grid item xs={12} width="100%">
            <TextField fullWidth label="Nguồn khách" name="source" value={formData.source} onChange={handleChange} />
          </Grid>

          {/* Sản phẩm đã giới thiệu */}
          <Grid item xs={12} width="100%">
            <Autocomplete
              multiple
              options={mockProperties}
              getOptionLabel={(option) => option.title}
              value={formData.introducedProperties}
              onChange={handlePropertyChange}
              renderInput={(params) => <TextField {...params} label="Sản phẩm đã giới thiệu" />}
            />
          </Grid>

          {/* Đánh giá khách */}
          <Grid item xs={12} width="100%">
            <TextField
              fullWidth
              label="Đánh giá khách"
              name="evaluation"
              multiline
              rows={4}
              value={formData.evaluation}
              onChange={handleChange}
            />
          </Grid>

          {/* Trạng thái khách hàng */}
          <Grid item xs={12} width="100%">
            <FormControl component="fieldset">
              <FormLabel component="legend">Trạng thái khách hàng</FormLabel>
              <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                {customerStatuses.map((status) => (
                  <FormControlLabel key={status} value={status} control={<Radio />} label={status} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Hậu mãi */}
          <Grid item xs={12} width="100%">
            <Typography variant="h6" gutterBottom>
              Hậu mãi
            </Typography>

            {/* Existing after-sales entries */}
            {formData.afterSales.map((entry, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>
                    Tháng {entry.month}, Ngày {entry.day} - {entry.name}
                  </Typography>
                  <IconButton size="small" onClick={() => removeAfterSaleEntry(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {entry.description}
                </Typography>
              </Box>
            ))}

            {/* New after-sales entry form */}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Tháng"
                  name="month"
                  type="number"
                  value={afterSaleEntry.month}
                  onChange={handleAfterSaleEntryChange}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Ngày"
                  name="day"
                  type="number"
                  value={afterSaleEntry.day}
                  onChange={handleAfterSaleEntryChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth label="Tên" name="name" value={afterSaleEntry.name} onChange={handleAfterSaleEntryChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Miêu tả"
                  name="description"
                  value={afterSaleEntry.description}
                  onChange={handleAfterSaleEntryChange}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button fullWidth variant="contained" onClick={addAfterSaleEntry} sx={{ height: '100%' }}>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Người tạo */}
          <Grid item xs={12} width="100%">
            <TextField required fullWidth label="Người tạo" name="creator" value={formData.creator} onChange={handleChange} />
          </Grid>

          {/* Chỉ định sale */}
          <Grid item xs={12} width="100%">
            <FormControl fullWidth>
              <InputLabel>Chỉ định sale</InputLabel>
              <Select label="Chỉ định sale" name="sale" value={formData.sale} onChange={handleChange}>
                <MenuItem value="">
                  <em>Không chọn</em>
                </MenuItem>
                <MenuItem value="Nguyễn Văn A">Nguyễn Văn A</MenuItem>
                <MenuItem value="Nguyễn Văn B">Nguyễn Văn B</MenuItem>
                <MenuItem value="Nguyễn Văn C">Nguyễn Văn C</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Tạo Khách Hàng
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustomerCreate;
