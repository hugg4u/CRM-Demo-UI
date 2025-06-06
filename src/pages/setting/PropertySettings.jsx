import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import MasterDataManager from 'components/MasterDataManager';

// Initial data for demonstration
const initialPropertyData = {
  propertyTypes: [
    { id: 1, name: 'Nhà phố', code: 'NPH' },
    { id: 2, name: 'Chung cư', code: 'CCU' },
    { id: 3, name: 'Biệt thự', code: 'BT' },
    { id: 4, name: 'Đất nền', code: 'DN' }
  ],
  propertyCategories: [
    { id: 1, name: 'Bán', code: 'BAN' },
    { id: 2, name: 'Cho thuê', code: 'THUE' },
    { id: 3, name: 'Sang nhượng', code: 'SN' }
  ],
  propertyLabels: [
    { id: 1, name: 'HOT', code: 'HOT' },
    { id: 2, name: 'VIP', code: 'VIP' },
    { id: 3, name: 'Mới', code: 'NEW' }
  ],
  houseStructures: [
    { id: 1, name: 'Nhà cấp 4', code: 'NHA_CAP_4' },
    { id: 2, name: 'Nhà 2 tầng', code: 'NHA_2_TANG' },
    { id: 3, name: 'Nhà 3 tầng', code: 'NHA_3_TANG' },
    { id: 4, name: 'Nhà 4 tầng trở lên', code: 'NHA_4_TANG_TRE_LEN' }
  ],
  houseTypes: [
    { id: 1, name: 'Nhà mặt tiền', code: 'NHA_MAT_TIEN' },
    { id: 2, name: 'Nhà hẻm', code: 'NHA_HEM' },
    { id: 3, name: 'Nhà góc hai mặt tiền', code: 'NHA_GOC_HAI_MAT_TIEN' }
  ],
  directions: [
    { id: 1, name: 'Đông', code: 'E' },
    { id: 2, name: 'Tây', code: 'W' },
    { id: 3, name: 'Nam', code: 'S' },
    { id: 4, name: 'Bắc', code: 'N' },
    { id: 5, name: 'Đông Nam', code: 'SE' },
    { id: 6, name: 'Đông Bắc', code: 'NE' },
    { id: 7, name: 'Tây Nam', code: 'SW' },
    { id: 8, name: 'Tây Bắc', code: 'NW' }
  ],
  propertyFeatures: [
    { id: 1, name: 'Có thang máy', code: 'THANG_MAY' },
    { id: 2, name: 'Có sân vườn', code: 'SAN_VUON' },
    { id: 3, name: 'Gần trường học', code: 'GIAN_TRUONG_HOC' },
    { id: 4, name: 'Gần chợ', code: 'GIAN_CHOT' },
    { id: 5, name: 'Có garage', code: 'GARAGE' }
  ],
  legalStatuses: [
    { id: 1, name: 'Sổ đỏ', code: 'SO_DO' },
    { id: 2, name: 'Sổ hồng', code: 'SO_HONG' },
    { id: 3, name: 'Giấy tờ hợp lệ', code: 'GIY_TO_HOP_LE' },
    { id: 4, name: 'Đang chờ sổ', code: 'DANG_CHO_SO' }
  ],
  propertyStatuses: [
    { id: 1, name: 'Có sẵn', code: 'CO_SAN' },
    { id: 2, name: 'Đã cọc', code: 'DA_COC' },
    { id: 3, name: 'Đã bán', code: 'DA_BAN' },
    { id: 4, name: 'Tạm ngưng', code: 'TAM_NGUONG' }
  ]
};

// Field configurations for each data type
const fieldConfigs = {
  propertyTypes: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên loại BĐS', type: 'text', required: true }
  ],
  propertyCategories: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên dạng BĐS', type: 'text', required: true }
  ],
  propertyLabels: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên nhãn', type: 'text', required: true }
  ],
  houseStructures: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên kết cấu', type: 'text', required: true }
  ],
  houseTypes: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên dạng nhà', type: 'text', required: true }
  ],
  directions: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên hướng', type: 'text', required: true }
  ],
  propertyFeatures: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên đặc điểm', type: 'text', required: true }
  ],
  legalStatuses: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên tình trạng pháp lý', type: 'text', required: true }
  ],
  propertyStatuses: [
    { key: 'code', label: 'Mã', type: 'text', required: true },
    { key: 'name', label: 'Tên trạng thái', type: 'text', required: true }
  ]
};

const PropertySettings = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [propertyData, setPropertyData] = useState(initialPropertyData);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSave = (dataKey, newData) => {
    setPropertyData((prev) => ({
      ...prev,
      [dataKey]: newData
    }));

    // Here you would typically save to your backend
    console.log(`Saving ${dataKey}:`, newData);
  };

  const tabs = [
    {
      label: 'Loại BĐS',
      key: 'propertyTypes',
      title: 'Loại bất động sản',
      description: 'Quản lý các loại bất động sản như nhà phố, chung cư, biệt thự...'
    },
    {
      label: 'Dạng BĐS',
      key: 'propertyCategories',
      title: 'Dạng bất động sản',
      description: 'Quản lý các dạng giao dịch: bán, cho thuê, sang nhượng...'
    },
    {
      label: 'Nhãn BĐS',
      key: 'propertyLabels',
      title: 'Nhãn bất động sản',
      description: 'Quản lý các nhãn để đánh dấu bất động sản: HOT, VIP, MỚI...'
    },
    {
      label: 'Kết cấu nhà',
      key: 'houseStructures',
      title: 'Kết cấu nhà',
      description: 'Quản lý các loại kết cấu nhà: cấp 4, 2 tầng, 3 tầng...'
    },
    {
      label: 'Dạng nhà',
      key: 'houseTypes',
      title: 'Dạng nhà',
      description: 'Quản lý các dạng nhà: mặt tiền, hẻm, góc hai mặt tiền...'
    },
    {
      label: 'Hướng',
      key: 'directions',
      title: 'Hướng nhà',
      description: 'Quản lý các hướng nhà: Đông, Tây, Nam, Bắc...'
    },
    {
      label: 'Đặc điểm',
      key: 'propertyFeatures',
      title: 'Đặc điểm nhà đất',
      description: 'Quản lý các đặc điểm của nhà đất: có thang máy, sân vườn...'
    },
    {
      label: 'Pháp lý',
      key: 'legalStatuses',
      title: 'Tình trạng pháp lý',
      description: 'Quản lý các tình trạng pháp lý: sổ đỏ, sổ hồng, giấy tờ hợp lệ...'
    },
    {
      label: 'Tình trạng',
      key: 'propertyStatuses',
      title: 'Tình trạng bất động sản',
      description: 'Quản lý các tình trạng giao dịch: có sẵn, đã cọc, đã bán...'
    }
  ];

  const currentTabData = tabs[currentTab];

  return (
    <MainCard title="Cài đặt bất động sản">
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
        initialData={propertyData[currentTabData.key]}
        onSave={handleSave}
        description={currentTabData.description}
      />
    </MainCard>
  );
};

export default PropertySettings;
