import {Flex, Tooltip} from 'antd';
import cn from 'classnames';
import {useLocation, useNavigate} from 'react-router-dom';

import {useAppDispatch} from '@store/config/hooks';
import {logout} from '@store/slices/auth-slice';

import styles from './header.module.scss';
import LogoutSvg from "@assets/logout.svg?react";
import LogoSvg from '@assets/logo.svg?react';

type NavMenu = {
  title: string,
  path: string,
}
const navMenus: NavMenu[] = [
  {title: 'Домой', path: '/'},
  {title: 'Задачи', path: '/tasks'}
]

export const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleTitleClick = () => {
    navigate('/');
  }

  return (
    <nav className={styles.header}>
      <Flex
        className={styles['title-container']}
        align='center'
        gap={8}
        onClick={handleTitleClick}
      >
        <LogoSvg className={styles.logo} />
        <div className={styles.title}>ЛогистИгра</div>
      </Flex>
      <Flex className={styles.menu}>
        {navMenus.map(m => (
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
