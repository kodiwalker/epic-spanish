import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export const ProtectedRoute = ({ element, ...restProps }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
