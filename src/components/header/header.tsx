import {Flex, Tooltip} from 'antd';
import cn from 'classnames';
import {useLocation, useNavigate} from 'react-router-dom';

import {useAppDispatch} from '@store/config/hooks';
import {logout} from '@store/slices/auth-slice';

import styles from './header.module.scss';
import LogoutSvg from "@assets/logout.svg?react";
import logoImage from '@assets/logo.svg';

export const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className={styles.header}>
      <Flex align='center' gap={8}>
        <img
          className={styles.logo}
          src={logoImage}
          alt="Dice logo"
        />
        <div className={styles.title}>
          ЛогистИгра
        </div>
      </Flex>
      <Flex
        className={styles.menu}
      >
        {[
          {title: 'Домой', path: '/'},
          {title: 'Задачи', path: '/tasks'}
        ].map(m => (
          <div
            key={m.path}
            className={cn(styles.item, (location.pathname === m.path) && styles.active)}
            onClick={() => navigate(m.path)}
          >{m.title}
          </div>
        ))}
        <Tooltip
          className={styles.tooltip} 
          title='Выйти'
          placement='bottomLeft'
        >
          <LogoutSvg onClick={handleLogout} className={styles['logout-icon']} />
        </Tooltip>
      </Flex>
    </nav>
  )
}
