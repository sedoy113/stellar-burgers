import { FC } from 'react';

import styles from './profile-orders.module.css';

import { OrdersList, ProfileMenu } from '@components';
import { Preloader } from '../../preloader';
import { ProfileOrdersUIProps } from './type';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({
  orders,
  isLoading
}: ProfileOrdersUIProps) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      {isLoading ? <Preloader /> : <OrdersList orders={orders} />}
    </div>
  </main>
);
