// assets
import { BellOutlined } from '@ant-design/icons';

// icons
const icons = {
  BellOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const transaction = {
  id: 'group-notification',
  title: 'Quản lý thông báo',
  type: 'group',
  children: [
    {
      id: 'notification-create',
      title: 'Tạo thông báo',
      type: 'item',
      url: '/notification/create',
      icon: icons.BellOutlined
    },
    {
      id: 'notification-list',
      title: 'Danh sách thông báo',
      type: 'item',
      url: '/notification/list',
      icon: icons.BellOutlined
    }
  ]
};

export default transaction;
