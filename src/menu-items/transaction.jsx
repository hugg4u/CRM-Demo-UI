// assets
import { DollarOutlined } from '@ant-design/icons';

// icons
const icons = {
  DollarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const transaction = {
  id: 'group-transaction',
  title: 'Quản lý giao dịch',
  type: 'collapse',
  children: [
    {
      id: 'transaction-create',
      title: 'Tạo giao dịch',
      type: 'item',
      url: '/transaction/create',
      icon: icons.DollarOutlined,
      breadcrumbs: false
    },
    {
      id: 'transaction-list',
      title: 'Danh sách giao dịch',
      type: 'item',
      url: '/transaction/list',
      icon: icons.DollarOutlined
    }
  ]
};

export default transaction;
