// assets
import { KeyOutlined, UserAddOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  KeyOutlined,
  UserAddOutlined,
  TeamOutlined
};

// ==============================|| MENU ITEMS - PERMISSION ||============================== //

const permission = {
  id: 'group-permission',
  title: 'Cấp quyền',
  type: 'collapse',
  children: [
    {
      id: 'account-create',
      title: 'Tạo tài khoản mới',
      type: 'item',
      url: '/permission/account/create',
      icon: icons.UserAddOutlined
    },
    {
      id: 'employee-list',
      title: 'Danh sách nhân viên',
      type: 'item',
      url: '/permission/employee/list',
      icon: icons.TeamOutlined
    }
  ]
};

export default permission;
