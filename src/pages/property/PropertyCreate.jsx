import { Clear as ClearIcon, CloudUpload as CloudUploadIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';

// Mock data - trong thực tế sẽ fetch từ API
const mockData = {
  propertyTypes: [
    { id: 1, name: 'Nhà riêng' },
    { id: 2, name: 'Chung cư' },
    { id: 3, name: 'Đất nền' },
    { id: 4, name: 'Biệt thự' },
    { id: 5, name: 'Shophouse' }
  ],
  propertyForms: [
    { id: 1, name: 'Bán' },
    { id: 2, name: 'Cho thuê' },
    { id: 3, name: 'Sang nhượng' }
  ],
  labels: [
    { id: 1, name: 'Hot' },
    { id: 2, name: 'Đã cọc' },
    { id: 3, name: 'VIP' },
    { id: 4, name: 'Tiềm năng' }
  ],
  houseStructures: [
    { id: 1, name: 'Bê tông cốt thép' },
    { id: 2, name: 'Gạch đỏ' },
    { id: 3, name: 'Khung thép' },
    { id: 4, name: 'Gỗ' }
  ],
  houseTypes: [
    { id: 1, name: 'Nhà cấp 4' },
    { id: 2, name: 'Nhà 1 tầng' },
    { id: 3, name: 'Nhà 2 tầng' },
    { id: 4, name: 'Nhà 3 tầng' },
    { id: 5, name: 'Nhà nhiều tầng' }
  ],
  directions: [
    { id: 1, name: 'Đông' },
    { id: 2, name: 'Tây' },
    { id: 3, name: 'Nam' },
    { id: 4, name: 'Bắc' },
    { id: 5, name: 'Đông Nam' },
    { id: 6, name: 'Đông Bắc' },
    { id: 7, name: 'Tây Nam' },
    { id: 8, name: 'Tây Bắc' }
  ],
  propertyFeatures: [
    { id: 1, name: 'Gần chợ' },
    { id: 2, name: 'Gần trường học' },
    { id: 3, name: 'Gần bệnh viện' },
    { id: 4, name: 'Gần công viên' },
    { id: 5, name: 'Mặt tiền đường lớn' },
    { id: 6, name: 'Có sân vườn' },
    { id: 7, name: 'Có garage' },
    { id: 8, name: 'An ninh tốt' }
  ],
  legalStatus: [
    { id: 1, name: 'Sổ đỏ' },
    { id: 2, name: 'Sổ hồng' },
    { id: 3, name: 'Giấy tờ hợp lệ' },
    { id: 4, name: 'Đang chờ sổ' }
  ],
  propertyStatus: [
    { id: 1, name: 'Còn trống' },
    { id: 2, name: 'Đang có người ở' },
    { id: 3, name: 'Đang sửa chữa' }
  ]
};

const PropertyCreate = () => {
  const [formData, setFormData] = useState({
    // Thông tin cơ bản
    propertyType: '',
    propertyForm: '',
    labels: [],
    propertyName: '',
    images: [],
    gender: '',
    phone: '',
    socialNote: '',
    address: '',
    price: '',

    // Diện tích
    floorArea: '',
    widthArea: '',
    lengthArea: '',
    usableArea: '',

    // Thông tin nhà
    houseStructures: [],
    houseType: '',
    bedrooms: '',
    direction: '',
    rentalPeriodFrom: null,
    rentalPeriodTo: null,
    propertyFeatures: [],
    currentStatus: '',
    legalStatus: '',
    brokerageFee: '',
    propertyStatus: '',

    // Trạng thái
    displayStatus: 'pending',
    statusNote: '',

    // Vị trí
    mapX: '',
    mapY: '',

    // Người tạo
    creator: 'Admin' // Sẽ lấy từ user hiện tại
  });

  const [imagePreview, setImagePreview] = useState([]);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value]
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (formData.images.length + files.length > 12) {
      alert('Tối đa 12 ảnh');
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Xử lý submit form
  };

  const handleReset = () => {
    setFormData({
      propertyType: '',
      propertyForm: '',
      labels: [],
      propertyName: '',
      images: [],
      gender: '',
      phone: '',
      socialNote: '',
      address: '',
      price: '',
      floorArea: '',
      widthArea: '',
      lengthArea: '',
      usableArea: '',
      houseStructures: [],
      houseType: '',
      bedrooms: '',
      direction: '',
      rentalPeriodFrom: null,
      rentalPeriodTo: null,
      propertyFeatures: [],
      currentStatus: '',
      legalStatus: '',
      brokerageFee: '',
      propertyStatus: '',
      displayStatus: 'pending',
      statusNote: '',
      mapX: '',
      mapY: '',
      creator: 'Admin'
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Tạo Bất Động Sản Mới
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Thông tin cơ bản */}
            <MainCard title="Thông tin cơ bản">
              <Stack spacing={2}>
                {/* Loại BDS */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Loại BDS *</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl>
                      <RadioGroup
                        row
                        value={formData.propertyType}
                        onChange={handleInputChange('propertyType')}
                        sx={{ gap: 2, flexWrap: 'wrap' }}
                      >
                        {mockData.propertyTypes.map((type) => (
                          <FormControlLabel key={type.id} value={type.id.toString()} control={<Radio />} label={type.name} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Dạng BDS */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Dạng BDS *</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl>
                      <RadioGroup
                        row
                        value={formData.propertyForm}
                        onChange={handleInputChange('propertyForm')}
                        sx={{ gap: 2, flexWrap: 'wrap' }}
                      >
                        {mockData.propertyForms.map((form) => (
                          <FormControlLabel key={form.id} value={form.id.toString()} control={<Radio />} label={form.name} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Nhãn */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Nhãn</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormGroup row sx={{ gap: 2, flexWrap: 'wrap' }}>
                      {mockData.labels.map((label) => (
                        <FormControlLabel
                          key={label.id}
                          control={
                            <Checkbox
                              checked={formData.labels.includes(label.id.toString())}
                              onChange={() => handleCheckboxChange('labels', label.id.toString())}
                            />
                          }
                          label={label.name}
                        />
                      ))}
                    </FormGroup>
                  </Grid>
                </Grid>

                {/* Tên BDS */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Tên BDS *</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9} width="100%">
                    <TextField fullWidth value={formData.propertyName} onChange={handleInputChange('propertyName')} required />
                  </Grid>
                </Grid>

                {/* Upload ảnh */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Hình ảnh</FormLabel>
                    <Typography variant="caption" display="block">
                      Tối đa 12 ảnh
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Box sx={{ mb: 2 }}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        multiple
                        type="file"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} disabled={formData.images.length >= 12}>
                          Tải ảnh lên
                        </Button>
                      </label>
                    </Box>

                    {formData.images.length > 0 && (
                      <Grid container spacing={2}>
                        {formData.images.map((image) => (
                          <Grid item xs={6} sm={4} md={3} key={image.id}>
                            <Box sx={{ position: 'relative' }}>
                              <img
                                src={image.preview}
                                alt="Preview"
                                style={{
                                  width: '100%',
                                  height: 120,
                                  objectFit: 'cover',
                                  borderRadius: 4
                                }}
                              />
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  bgcolor: 'rgba(255,255,255,0.8)',
                                  '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.9)'
                                  }
                                }}
                                onClick={() => removeImage(image.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                {/* Chủ BDS */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Chủ BDS</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9} width="100%">
                    <Select fullWidth value={formData.owner} onChange={handleInputChange('owner')}>
                      <MenuItem value="1">Nguyễn Văn A</MenuItem>
                      <MenuItem value="2">Trần Thị B</MenuItem>
                      <MenuItem value="3">Lê Văn C</MenuItem>
                    </Select>
                  </Grid>
                </Grid>

                {/* Địa chỉ */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Địa chỉ *</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9} width="100%">
                    <TextField fullWidth value={formData.address} onChange={handleInputChange('address')} required />
                  </Grid>
                </Grid>

                {/* Giá */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormLabel sx={{ fontWeight: 500 }}>Giá *</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange('price')}
                      required
                      InputProps={{
                        endAdornment: 'VNĐ'
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>

            {/* Thông tin diện tích */}
            <MainCard title="Thông tin diện tích" className="space-y-4">
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Diện tích sàn (m²)"
                    type="number"
                    value={formData.floorArea}
                    onChange={handleInputChange('floorArea')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Diện tích ngang (m)"
                    type="number"
                    value={formData.widthArea}
                    onChange={handleInputChange('widthArea')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Diện tích dài (m)"
                    type="number"
                    value={formData.lengthArea}
                    onChange={handleInputChange('lengthArea')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Diện tích sử dụng (m²)"
                    type="number"
                    value={formData.usableArea}
                    onChange={handleInputChange('usableArea')}
                  />
                </Grid>
              </Grid>
            </MainCard>

            {/* Thông tin chi tiết nhà */}
            <MainCard title="Thông tin chi tiết" className="space-y-4">
              <Grid container spacing={3} alignItems="center">
                {/* Kết cấu nhà */}
                <Grid item xs={12} md={6} width="100%">
                  <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="font-medium mb-2">
                      Kết cấu nhà
                    </FormLabel>
                    <FormGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" row>
                      {mockData.houseStructures.map((structure) => (
                        <FormControlLabel
                          key={structure.id}
                          control={
                            <Checkbox
                              checked={formData.houseStructures.includes(structure.id.toString())}
                              onChange={() => handleCheckboxChange('houseStructures', structure.id.toString())}
                            />
                          }
                          label={structure.name}
                          className="m-0"
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Dạng nhà */}
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="font-medium mb-2">
                      Dạng nhà
                    </FormLabel>
                    <RadioGroup value={formData.houseType} onChange={handleInputChange('houseType')} className="space-x-4" row>
                      {mockData.houseTypes.map((type) => (
                        <FormControlLabel key={type.id} value={type.id.toString()} control={<Radio />} label={type.name} className="m-0" />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3} alignItems="center" width="100%">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số phòng ngủ"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange('bedrooms')}
                  />
                </Grid>
                <Grid item xs={12} md={6} width={100}>
                  <FormControl fullWidth className="w-full">
                    <InputLabel component="legend">Hướng</InputLabel>
                    <Select
                      value={formData.direction}
                      onChange={handleInputChange('direction')}
                      label="Hướng"
                      className="w-full"
                      sx={{ width: '100%' }}
                    >
                      {mockData.directions.map((direction) => (
                        <MenuItem key={direction.id} value={direction.id.toString()}>
                          {direction.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} width="100%" display="flex" alignItems="center" flexDirection="row" gap={2}>
                  <FormLabel component="legend" className="font-medium mb-2">
                    Thời hạn thuê
                  </FormLabel>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Từ ngày"
                      value={formData.rentalPeriodFrom}
                      onChange={(newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          rentalPeriodFrom: newValue
                        }));
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Đến ngày"
                      value={formData.rentalPeriodTo}
                      onChange={(newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          rentalPeriodTo: newValue
                        }));
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={3} alignItems="center">
                {/* Đặc điểm nhà đất */}
                <Grid item xs={12}>
                  <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="font-medium mb-2">
                      Đặc điểm nhà đất
                    </FormLabel>
                    <FormGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" row>
                      {mockData.propertyFeatures.map((feature) => (
                        <FormControlLabel
                          key={feature.id}
                          control={
                            <Checkbox
                              checked={formData.propertyFeatures.includes(feature.id.toString())}
                              onChange={() => handleCheckboxChange('propertyFeatures', feature.id.toString())}
                            />
                          }
                          label={feature.name}
                          className="m-0"
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3} alignItems="center">
                {/* Hiện trạng */}
                <Grid item xs={12} width="100%">
                  <TextField
                    fullWidth
                    label="Hiện trạng"
                    multiline
                    rows={3}
                    value={formData.currentStatus}
                    onChange={handleInputChange('currentStatus')}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} alignItems="center">
                {/* Pháp lý */}
                <Grid item xs={12} md={6} width="100%">
                  <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="font-medium mb-2">
                      Pháp lý
                    </FormLabel>
                    <RadioGroup value={formData.legalStatus} onChange={handleInputChange('legalStatus')} className="space-x-4" row>
                      {mockData.legalStatus.map((status) => (
                        <FormControlLabel
                          key={status.id}
                          value={status.id.toString()}
                          control={<Radio />}
                          label={status.name}
                          className="m-0"
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3} alignItems="center">
                {/* Tình trạng */}
                <Grid item xs={12} md={6} width="100%">
                  <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="font-medium mb-2">
                      Tình trạng
                    </FormLabel>
                    <RadioGroup value={formData.propertyStatus} onChange={handleInputChange('propertyStatus')} className="space-x-4" row>
                      {mockData.propertyStatus.map((status) => (
                        <FormControlLabel
                          key={status.id}
                          value={status.id.toString()}
                          control={<Radio />}
                          label={status.name}
                          className="m-0"
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3} alignItems="center">
                {/* Phí môi giới */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phí môi giới (%)"
                    type="number"
                    value={formData.brokerageFee}
                    onChange={handleInputChange('brokerageFee')}
                    InputProps={{
                      endAdornment: '%'
                    }}
                  />
                </Grid>
              </Grid>
            </MainCard>

            {/* Trạng thái hiển thị */}
            <MainCard title="Trạng thái hiển thị" className="space-y-4">
              <FormControl component="fieldset" className="w-full flex flex-row" width="100%">
                <FormLabel component="legend" className="font-medium mb-2 mr-4">
                  Trạng thái hiển thị
                </FormLabel>
                <RadioGroup
                  value={formData.displayStatus}
                  onChange={handleInputChange('displayStatus')}
                  className="space-x-4 flex flex-row"
                  row
                >
                  <FormControlLabel value="showing" control={<Radio />} label="Đang hiển thị" />
                  <FormControlLabel value="not_showing" control={<Radio />} label="Chưa hiển thị" />
                  <FormControlLabel value="paused" control={<Radio />} label="Tạm ngưng" />
                  <FormControlLabel value="hidden" control={<Radio />} label="Đang ẩn" />
                  <FormControlLabel value="pending" control={<Radio />} label="Cần check thông tin" />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Ghi chú lý do trạng thái"
                multiline
                rows={4}
                value={formData.statusNote}
                onChange={handleInputChange('statusNote')}
              />
            </MainCard>

            {/* Thông tin vị trí */}
            <MainCard title="Thông tin vị trí" className="space-y-4">
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tọa độ X (Longitude)"
                    type="number"
                    value={formData.mapX}
                    onChange={handleInputChange('mapX')}
                    inputProps={{ step: 'any' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tọa độ Y (Latitude)"
                    type="number"
                    value={formData.mapY}
                    onChange={handleInputChange('mapY')}
                    inputProps={{ step: 'any' }}
                  />
                </Grid>
              </Grid>
            </MainCard>

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<ClearIcon />} onClick={handleReset}>
                Làm mới
              </Button>
              <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                Lưu BDS
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default PropertyCreate;
