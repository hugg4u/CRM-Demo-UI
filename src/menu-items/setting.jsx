// assets
import { SettingOutlined, DatabaseOutlined, TagOutlined, UserOutlined, TeamOutlined, SwapOutlined } from '@ant-design/icons';

// icons
const icons = {
  SettingOutlined,
  DatabaseOutlined,
  TagOutlined,
  UserOutlined,
  TeamOutlined,
  SwapOutlined
};

// ==============================|| MENU ITEMS - SETTING ||============================== //

const setting = {
  id: 'group-setting',
  title: 'Cài đặt hệ thống',
  icon: icons.SettingOutlined,
  type: 'collapse',
  children: [
    {
      id: 'property-settings',
      title: 'Cài đặt bất động sản',
      type: 'item',
      url: '/setting/property',
      icon: icons.TagOutlined
    },
    {
      id: 'customer-settings',
      title: 'Cài đặt khách hàng',
      type: 'item',
      url: '/setting/customer',
      icon: icons.UserOutlined
    },
    {
      id: 'transaction-settings',
      title: 'Cài đặt giao dịch',
      type: 'item',
      url: '/setting/transaction',
      icon: icons.SwapOutlined
    },
    {
      id: 'employee-settings',
      title: 'Cài đặt nhân viên',
      type: 'item',
      url: '/setting/employee',
      icon: icons.TeamOutlined
    }
  ]
};

export default setting;
