import { useState } from 'react';
import { Box, Tabs, Tab, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import MasterDataManager from 'components/MasterDataManager';

// Initial data for demonstration
const initialEmployeeData = {
  departments: [
    { id: 1, name: 'Ban giám đốc', code: 'BGD' },
    { id: 2, name: 'Phòng kinh doanh', code: 'PKD' },
    { id: 3, name: 'Phòng marketing', code: 'PMK' },
    { id: 4, name: 'Phòng kế toán', code: 'PKT' },
    { id: 5, name: 'Phòng hành chính', code: 'PHC' }
  ],
  positions: [
    { id: 1, name: 'Giám đốc', code: 'GD' },
    { id: 2, name: 'Phó giám đốc', code: 'PGD' },
    { id: 3, name: 'Trưởng phòng', code: 'TP' },
    { id: 4, name: 'Phó phòng', code: 'PP' },
    { id: 5, name: 'Nhân viên', code: 'NV' },
    { id: 6, name: 'Thực tập sinh', code: 'TTS' }
  ]
};

// Field configurations for each data type
const fieldConfigs = {
  departments: [
    { key: 'code', label: 'Mã phòng ban', type: 'text', required: true },
    { key: 'name', label: 'Tên phòng ban', type: 'text', required: true }
  ],
  positions: [
    { key: 'code', label: 'Mã chức danh', type: 'text', required: true },
    { key: 'name', label: 'Tên chức danh', type: 'text', required: true }
  ]
};

const EmployeeSettings = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSave = (dataKey, newData) => {
    setEmployeeData((prev) => ({
      ...prev,
      [dataKey]: newData
    }));

    // Here you would typically save to your backend
    console.log(`Saving ${dataKey}:`, newData);
  };

  const tabs = [
    {
      label: 'Phòng ban',
      key: 'departments',
      title: 'Vị trí phòng ban',
      description: 'Quản lý các phòng ban trong công ty: ban giám đốc, phòng kinh doanh, marketing...'
    },
    {
      label: 'Chức danh',
      key: 'positions',
      title: 'Chức danh',
      description: 'Quản lý các chức danh nhân viên: giám đốc, trưởng phòng, nhân viên...'
    }
  ];

  const currentTabData = tabs[currentTab];

  return (
    <MainCard title="Cài đặt nhân viên">
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
        initialData={employeeData[currentTabData.key]}
        onSave={handleSave}
        description={currentTabData.description}
      />
    </MainCard>
  );
};

export default EmployeeSettings;
