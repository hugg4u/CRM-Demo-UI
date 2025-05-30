// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const customer = {
  id: 'group-customer',
  title: 'Quản lý khách hàng',
  type: 'collapse',
  children: [
    {
      id: 'customer-create',
      title: 'Tạo khách hàng',
      type: 'item',
      url: '/customer/create',
      icon: icons.UserOutlined
    },
    {
      id: 'customer-list',
      title: 'Danh sách khách hàng',
      type: 'item',
      url: '/customer/list',
      icon: icons.UserOutlined
    }
  ]
};

export default customer;
