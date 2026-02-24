import { ProfileMenuUI } from '@ui';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../services/AsyncThunk/logoutThunk';
import { useDispatch, useSelector } from '../../services/store';
import { isSuccessLogout } from '../../services/Slices/logoutSlice.slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isSuccess = useSelector(isSuccessLogout);
  const navigate = useNavigate();

  useEffect(() => {
    isSuccess && navigate('/login');
  }, [isSuccess, navigate]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
