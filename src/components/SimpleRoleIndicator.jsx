import { Box, Typography, Chip, Divider } from '@mui/material';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import useRole from 'hooks/useRole';

const SimpleRoleIndicator = () => {
  const { role, isAdmin } = useRole();

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {isAdmin ? (
          <CrownOutlined style={{ color: '#f44336', fontSize: 16 }} />
        ) : (
          <UserOutlined style={{ color: '#1976d2', fontSize: 16 }} />
        )}
        <Typography variant="caption" color="text.secondary">
          Vai trò hiện tại
        </Typography>
      </Box>
      <Chip
        label={isAdmin ? 'Admin' : 'Sale'}
        color={isAdmin ? 'error' : 'primary'}
        variant="filled"
        size="small"
        sx={{
          fontWeight: 'bold',
          fontSize: '0.7rem',
          height: 24
        }}
      />
      <Divider sx={{ mt: 1.5 }} />
    </Box>
  );
};

export default SimpleRoleIndicator;
