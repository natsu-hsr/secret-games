import {Flex} from 'antd';
import cn from 'classnames';
import type {FC} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import styles from './styles.module.scss';

import LogoSvg from '@assets/logo.svg?react';
import {UserAccountMenu} from './user-account-menu';


type NavMenu = {
  title: string,
  path: string,
}
const navMenus: NavMenu[] = [
  {title: 'Домой', path: '/'},
  {title: 'Задачи', path: '/tasks'}
]

export const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        <UserAccountMenu />
      </Flex>
    </nav>
  )
}
