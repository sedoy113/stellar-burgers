import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

export const AppHeaderUI: FC<TAppHeaderUIProps> = React.memo(
  ({ userName }: TAppHeaderUIProps) => {
    const classByActive = ({ isActive }: { isActive: boolean }) =>
      isActive ? styles.link_active : styles.link;

    return (
      <header className={styles.header}>
        <nav className={`${styles.menu} p-4`}>
          <div className={styles.menu_part_left}>
            <>
              <BurgerIcon type={'primary'} />
              <NavLink className={classByActive} to='/'>
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </NavLink>
            </>
            <>
              <ListIcon type={'primary'} />
              <NavLink className={classByActive} to='/feed'>
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </NavLink>
            </>
          </div>
          <div className={styles.logo}>
            <Link to='/'>
              <Logo className='' />
            </Link>
          </div>
          <div className={styles.link_position_last}>
            <ProfileIcon type={'primary'} />
            <NavLink
              className={classByActive}
              to={userName ? '/profile' : '/login'}
            >
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }
);
