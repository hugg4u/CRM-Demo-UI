import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  FormControlLabel,
  Switch,
  Chip,
  Paper
} from '@mui/material';
import MainCard from 'components/MainCard';

const NotificationCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info', // info, warning, success, error
    priority: 'normal', // low, normal, high, urgent
    recipients: [],
    isScheduled: false,
    scheduledTime: '',
    action: '',
    actionUrl: '',
    isActive: true
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here
  };

  return (
    <MainCard title="Tạo Thông báo">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} width="100%">
            <TextField fullWidth label="Người nhận" name="recipients" value={formData.recipients} onChange={handleChange} required />
          </Grid>

          {/* Tiêu đề */}
          <Grid item xs={12} width="100%">
            <TextField fullWidth label="Tiêu đề" name="title" value={formData.title} onChange={handleChange} required />
          </Grid>

          {/* Nội dung */}
          <Grid item xs={12} width="100%">
            <TextField
              fullWidth
              label="Nội dung"
              name="content"
              multiline
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} width="100%">
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Tạo Thông báo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default NotificationCreate;
