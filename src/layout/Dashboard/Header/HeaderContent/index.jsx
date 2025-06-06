// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project imports
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { GithubOutlined } from '@ant-design/icons';
import { Button, Chip, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router';
import useRole from 'hooks/useRole';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role, isAdmin, isSale } = useRole();
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
      {/* {!downLG && <Search />} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {/* <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton> */}

      <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginRight: 20 }}>
        {/* Current Role Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Typography variant="body2" color="text.secondary">
            Vai trò:
          </Typography>
          <Chip
            label={isAdmin ? 'Quản trị viên' : 'Nhân viên bán hàng'}
            color={isAdmin ? 'error' : 'primary'}
            size="small"
            variant="filled"
          />
        </div>

        {/* Role Switch Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button
            variant={isAdmin ? 'contained' : 'outlined'}
            color="error"
            size="small"
            onClick={() => navigate(`?role=admin`)}
            disabled={isAdmin}
          >
            Admin
          </Button>
          <Button
            variant={isSale ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            onClick={() => navigate(`?role=sale`)}
            disabled={isSale}
          >
            Sale
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Notification />
        {!downLG && <Profile />}
        {downLG && <MobileSection />}
      </div>
    </div>
  );
}
