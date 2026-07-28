import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';

export const ProtectedRouteLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (!auth?.id) return <Navigate to='/login' state={{ from: location }} replace />;

  return <Outlet />;
};
