import {Flex, Tooltip} from 'antd';
import RocketOutlined from '@ant-design/icons/lib/icons/RocketOutlined';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import cn from 'classnames';
import {useLocation, useNavigate} from 'react-router-dom';

import {useAppDispatch} from '../../store/config/hooks';
import {logout} from '../../store/slices/auth-slice';

import styles from './header.module.scss';

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
        <RocketOutlined className={styles.logo}/>
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
            // todo: костыль для роутов для github pages
            className={cn(styles.item, (location.pathname === m.path || location.pathname === '/home' && m.path === '/') && styles.active)}
            onClick={() => navigate(m.path)}
          >{m.title}
          </div>
        ))}
        <Tooltip
          title='Выйти'
          placement='bottomLeft'
        >
          <LogoutOutlined onClick={handleLogout} className={styles['user-icon']} />
        </Tooltip>
      </Flex>
    </nav>
  )
}
