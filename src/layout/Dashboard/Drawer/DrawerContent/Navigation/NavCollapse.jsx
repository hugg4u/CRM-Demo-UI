import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, matchPath } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project imports
import NavItem from './NavItem';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { DownOutlined, RightOutlined } from '@ant-design/icons';

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

export default function NavCollapse({ item, level }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { pathname } = useLocation();

  // Check if any child is selected
  const isSelected = item.children?.some((child) => {
    if (child.url) {
      return !!matchPath({ path: child.url, end: false }, pathname);
    }
    return false;
  });

  const [open, setOpen] = useState(isSelected || false);

  const handleClick = () => {
    setOpen(!open);
    if (downLG) {
      handlerDrawerOpen(false);
    }
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem',
        color: isSelected ? theme.palette.primary.main : theme.palette.text.primary
      }}
    />
  ) : (
    false
  );

  const textColor = isSelected ? 'primary.main' : 'text.primary';
  const iconSelectedColor = 'primary.main';

  // When drawer is closed, render only child items (skip parent collapse at any level)
  if (!drawerOpen) {
    return (
      <>
        {item.children?.map((child) => {
          switch (child.type) {
            case 'collapse':
              return <NavCollapse key={child.id} item={child} level={level + 1} />;
            case 'item':
              return <NavItem key={child.id} item={child} level={1} />;
            default:
              return null;
          }
        })}
      </>
    );
  }

  // Normal drawer open mode
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        // selected={isSelected}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': {
              bgcolor: 'primary.lighter',
              ...theme.applyStyles('dark', { bgcolor: 'divider' })
            },
            '&.Mui-selected': {
              bgcolor: 'primary.lighter',
              ...theme.applyStyles('dark', { bgcolor: 'divider' }),
              borderRight: '2px solid',
              borderColor: 'primary.main',
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                bgcolor: 'primary.lighter',
                ...theme.applyStyles('dark', { bgcolor: 'divider' })
              }
            }
          }),
          ...(!drawerOpen && {
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': {
              '&:hover': { bgcolor: 'transparent' },
              bgcolor: 'transparent'
            }
          })
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              // color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: 'secondary.lighter',
                  ...theme.applyStyles('dark', { bgcolor: 'secondary.light' })
                }
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: 'primary.lighter',
                  ...theme.applyStyles('dark', { bgcolor: 'primary.900' }),
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                    ...theme.applyStyles('dark', { bgcolor: 'primary.darker' })
                  }
                })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}

        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
        )}

        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemIcon
            sx={{
              minWidth: 'auto',
              marginLeft: 1,
              color: isSelected ? iconSelectedColor : textColor
            }}
          >
            {open ? <DownOutlined style={{ fontSize: '0.625rem' }} /> : <RightOutlined style={{ fontSize: '0.625rem' }} />}
          </ListItemIcon>
        )}
      </ListItemButton>

      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child) => {
              switch (child.type) {
                case 'collapse':
                  return <NavCollapse key={child.id} item={child} level={level + 1} />;
                case 'item':
                  return <NavItem key={child.id} item={child} level={level + 1} />;
                default:
                  return (
                    <Typography key={child.id} variant="h6" color="error" align="center">
                      Fix - Collapse Children
                    </Typography>
                  );
              }
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}

NavCollapse.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};
