// assets
import { CalendarOutlined } from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const appointment = {
  id: 'group-appointment',
  title: 'Quản lý lịch hẹn',
  type: 'collapse',
  children: [
    {
      id: 'appointment-create',
      title: 'Tạo lịch hẹn',
      type: 'item',
      url: '/appointment/create',
      icon: icons.CalendarOutlined
    },
    {
      id: 'appointment-list',
      title: 'Danh sách lịch hẹn',
      type: 'item',
      url: '/appointment/list',
      icon: icons.CalendarOutlined
    }
  ]
};

export default appointment;
