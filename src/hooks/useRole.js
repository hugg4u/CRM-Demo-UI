import { useLocation } from 'react-router-dom';

const useRole = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role') || 'admin'; // default to admin

  return {
    role,
    isAdmin: role === 'admin',
    isSale: role === 'sale'
  };
};

export default useRole;
