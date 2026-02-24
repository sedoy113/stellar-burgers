import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { ingredientsThunk } from '../../services/AsyncThunk/ingredientsThunk';
import { getOrdersThunk } from '../../services/AsyncThunk/orderThunk';
import {
  profileIsLoadingSelector,
  profileOrdersSelector
} from '../../services/Slices/profileOrders.slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(profileIsLoadingSelector);
  useEffect(() => {
    dispatch(ingredientsThunk());
    dispatch(getOrdersThunk());
  }, [dispatch]);
  const orders: TOrder[] = useSelector(profileOrdersSelector);

  return <ProfileOrdersUI orders={orders} isLoading={isLoading} />;
};
