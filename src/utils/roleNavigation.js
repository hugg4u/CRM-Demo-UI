// Utility to add role param to URLs
export const addRoleToUrl = (url, role) => {
  if (!url || !role) return url;

  // Nếu là admin thì không cần thêm param (default)
  if (role === 'admin') return url;

  // Nếu URL đã có role param, thay thế
  if (url.includes('role=')) {
    return url.replace(/role=[^&]*/, `role=${role}`);
  }

  // Thêm role param mới
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}role=${role}`;
};

// Get current role from URL
export const getCurrentRole = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('role') || 'admin';
};
