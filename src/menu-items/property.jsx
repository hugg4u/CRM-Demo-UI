// assets
import { ApartmentOutlined } from '@ant-design/icons';

// icons
const icons = {
  ApartmentOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const adminProperty = {
  id: 'group-property',
  title: 'Quản lý bất động sản',
  type: 'collapse',
  children: [
    {
      id: 'property-create',
      title: 'Tạo bất động sản',
      type: 'item',
      url: '/property/create',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'property-list',
      title: 'Danh sách bất động sản',
      type: 'item',
      url: '/property/list',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'property-map',
      title: 'Danh sách bất động sản kiểu Map',
      type: 'item',
      url: '/property/map',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'property-stop',
      title: 'Bất động sản tạm ngưng',
      type: 'item',
      url: '/property/stop',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'property-hide',
      title: 'Bất động sản đang ẩn',
      type: 'item',
      url: '/property/hide',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'property-check',
      title: 'Bất động sản kiểm tra thông tin',
      type: 'item',
      url: '/property/check',
      icon: icons.ApartmentOutlined
    }
  ]
};

export default adminProperty;
