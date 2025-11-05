import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  
  // Check if user is admin and redirect to appropriate login page
  const loginPath = user?.role === 'admin' || !user ? '/admin/signin' : '/signin';

  return isAuthenticated ? <Outlet /> : <Navigate to={loginPath} replace />;
};

export default ProtectedRoute;
