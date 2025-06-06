import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import MainCard from './MainCard';

const MasterDataManager = ({ title, dataKey, fields, initialData = [], onSave, description }) => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleAdd = () => {
    setCurrentItem({});
    setEditMode(false);
    setErrors({});
    setOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem({ ...item });
    setEditMode(true);
    setErrors({});
    setOpen(true);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    if (onSave) {
      onSave(dataKey, newData);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentItem({});
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && (!currentItem[field.key] || String(currentItem[field.key]).trim() === '')) {
        newErrors[field.key] = `${field.label} là bắt buộc`;
      }
      if (field.type === 'number' && currentItem[field.key] && isNaN(Number(currentItem[field.key]))) {
        newErrors[field.key] = `${field.label} phải là số`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    let newData;
    if (editMode) {
      newData = data.map((item) => (item.id === currentItem.id ? currentItem : item));
    } else {
      const newId = Math.max(...data.map((item) => item.id || 0), 0) + 1;
      newData = [...data, { ...currentItem, id: newId }];
    }

    setData(newData);
    if (onSave) {
      onSave(dataKey, newData);
    }
    handleClose();
  };

  const handleInputChange = (field, value) => {
    setCurrentItem((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getFieldValue = (item, field) => {
    const value = item[field.key];
    if (field.type === 'boolean') {
      return value ? 'Có' : 'Không';
    }
    if (field.type === 'array') {
      return Array.isArray(value) ? value.join(', ') : '';
    }
    return value || '';
  };

  const renderFormField = (field) => {
    const value = currentItem[field.key] || '';

    switch (field.type) {
      case 'text':
      case 'textarea':
        return (
          <TextField
            key={field.key}
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            error={!!errors[field.key]}
            helperText={errors[field.key]}
            multiline={field.type === 'textarea'}
            rows={field.type === 'textarea' ? 3 : 1}
            required={field.required}
          />
        );
      case 'number':
        return (
          <TextField
            key={field.key}
            fullWidth
            label={field.label}
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            error={!!errors[field.key]}
            helperText={errors[field.key]}
            required={field.required}
          />
        );
      case 'boolean':
        return (
          <FormControlLabel
            key={field.key}
            control={<Switch checked={Boolean(value)} onChange={(e) => handleInputChange(field.key, e.target.checked)} />}
            label={field.label}
          />
        );
      case 'select':
        return (
          <FormControl key={field.key} fullWidth error={!!errors[field.key]}>
            <InputLabel>{field.label}</InputLabel>
            <Select value={value} label={field.label} onChange={(e) => handleInputChange(field.key, e.target.value)}>
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors[field.key] && (
              <Typography variant="caption" color="error">
                {errors[field.key]}
              </Typography>
            )}
          </FormControl>
        );
      default:
        return (
          <TextField
            key={field.key}
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            error={!!errors[field.key]}
            helperText={errors[field.key]}
            required={field.required}
          />
        );
    }
  };

  return (
    <MainCard title={title}>
      {description && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {description}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Danh sách {title.toLowerCase()}</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Thêm mới
          </Button>
        </Box>

        {/* Data Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                {fields
                  .filter((field) => field.showInTable !== false)
                  .map((field) => (
                    <TableCell key={field.key}>{field.label}</TableCell>
                  ))}
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={fields.filter((field) => field.showInTable !== false).length + 2} align="center">
                    <Typography color="text.secondary">Chưa có dữ liệu nào</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    {fields
                      .filter((field) => field.showInTable !== false)
                      .map((field) => (
                        <TableCell key={field.key}>{field.render ? field.render(item) : getFieldValue(item, field)}</TableCell>
                      ))}
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton size="small" color="primary" onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>{editMode ? `Sửa ${title.toLowerCase()}` : `Thêm ${title.toLowerCase()} mới`}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {fields.map((field) => renderFormField(field))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} startIcon={<CancelIcon />}>
              Hủy
            </Button>
            <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />}>
              {editMode ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </MainCard>
  );
};

export default MasterDataManager;
