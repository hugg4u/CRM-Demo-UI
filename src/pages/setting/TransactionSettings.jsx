import { useState } from 'react';
import { Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import MasterDataManager from 'components/MasterDataManager';

// Initial data for demonstration
const initialTransactionData = {
  transactionTypes: [
    { id: 1, name: 'Bán', code: 'SELL' },
    { id: 2, name: 'Cho thuê', code: 'RENT' },
    { id: 3, name: 'Sang nhượng', code: 'TRANSFER' },
    { id: 4, name: 'Đầu tư', code: 'INVESTMENT' }
  ]
};

// Field configurations for each data type
const fieldConfigs = {
  transactionTypes: [
    { key: 'name', label: 'Tên loại giao dịch', type: 'text', required: true },
    { key: 'code', label: 'Mã', type: 'text', required: true }
  ]
};

const TransactionSettings = () => {
  const [transactionData, setTransactionData] = useState(initialTransactionData);

  const handleSave = (dataKey, newData) => {
    setTransactionData((prev) => ({
      ...prev,
      [dataKey]: newData
    }));

    // Here you would typically save to your backend
    console.log(`Saving ${dataKey}:`, newData);
  };

  return (
    <MainCard title="Cài đặt giao dịch">
      <MasterDataManager
        title="Loại giao dịch"
        dataKey="transactionTypes"
        fields={fieldConfigs.transactionTypes}
        initialData={transactionData.transactionTypes}
        onSave={handleSave}
        description="Quản lý các loại giao dịch: bán, cho thuê, sang nhượng, đầu tư..."
      />
    </MainCard>
  );
};

export default TransactionSettings;
