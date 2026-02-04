import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import {
  errorUserSelector,
  getUserSelector
} from '../../services/Slices/user.slice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const errorUser = useSelector(errorUserSelector);
  const user = useSelector(getUserSelector);

  return <AppHeaderUI userName={user?.name} />;
};
