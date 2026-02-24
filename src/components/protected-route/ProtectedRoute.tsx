import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router';
import {
  getIsAuthCheckSelector,
  getUserSelector
} from '../../services/Slices/user.slice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthCheck = useSelector(getIsAuthCheckSelector);
  const userInfo = useSelector(getUserSelector);

  const location = useLocation();

  if (!isAuthCheck) {
    return <Preloader />;
  }

  if (onlyUnAuth && userInfo) {
    const from = (location.state as any)?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !userInfo) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
