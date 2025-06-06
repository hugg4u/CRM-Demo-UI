import { useState } from 'react';
import { Box, Tabs, Tab, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import MasterDataManager from 'components/MasterDataManager';

// Initial data for demonstration
const initialCustomerData = {
  customerStatuses: [
    { id: 1, name: 'Tiềm năng', code: 'POTENTIAL' },
    { id: 2, name: 'Quan tâm', code: 'INTERESTED' },
    { id: 3, name: 'Đang thương lượng', code: 'NEGOTIATING' },
    { id: 4, name: 'Đã giao dịch', code: 'COMPLETED' },
    { id: 5, name: 'Không quan tâm', code: 'NOT_INTERESTED' }
  ],
  customerLabels: [
    { id: 1, name: 'VIP', code: 'VIP' },
    { id: 2, name: 'Thân thiết', code: 'LOYAL' },
    { id: 3, name: 'Mới', code: 'NEW' },
    { id: 4, name: 'Tái liên hệ', code: 'CALLBACK' }
  ]
};

// Field configurations for each data type
const fieldConfigs = {
  customerStatuses: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên trạng thái', type: 'text', required: true }
  ],
  customerLabels: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên nhãn', type: 'text', required: true }
  ]
};

const CustomerSettings = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [customerData, setCustomerData] = useState(initialCustomerData);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSave = (dataKey, newData) => {
    setCustomerData((prev) => ({
      ...prev,
      [dataKey]: newData
    }));

    // Here you would typically save to your backend
    console.log(`Saving ${dataKey}:`, newData);
  };

  const tabs = [
    {
      label: 'Trạng thái KH',
      key: 'customerStatuses',
      title: 'Trạng thái khách hàng',
      description: 'Quản lý các trạng thái khách hàng: tiềm năng, quan tâm, đã giao dịch...'
    },
    {
      label: 'Nhãn KH',
      key: 'customerLabels',
      title: 'Nhãn khách hàng',
      description: 'Quản lý các nhãn để phân loại khách hàng: VIP, thân thiết, mới...'
    }
  ];

  const currentTabData = tabs[currentTab];

  return (
    <MainCard title="Cài đặt khách hàng">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <MasterDataManager
        title={currentTabData.title}
        dataKey={currentTabData.key}
        fields={fieldConfigs[currentTabData.key]}
        initialData={customerData[currentTabData.key]}
        onSave={handleSave}
        description={currentTabData.description}
      />
    </MainCard>
  );
};

export default CustomerSettings;
