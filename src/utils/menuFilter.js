// Simple menu filter based on role
export const getMenuByRole = (menuItems, role) => {
  if (role === 'sale') {
    // Sale chỉ thấy basic modules, bỏ permission và setting
    return menuItems.filter((item) => !['group-permission', 'group-setting'].includes(item.id));
  }

  // Admin thấy tất cả
  return menuItems;
};
