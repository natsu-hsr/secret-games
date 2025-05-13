import {Flex} from 'antd';
import RocketOutlined from '@ant-design/icons/lib/icons/RocketOutlined';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import cn from 'classnames';
import {useLocation, useNavigate} from 'react-router-dom';

import styles from './header.module.scss';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
            className={cn(styles.item, location.pathname === m.path && styles.active)}
            onClick={() => navigate(m.path)}
          >{m.title}
          </div>
        ))}
        <UserOutlined className={styles['user-icon']} />
      </Flex>
    </nav>
  )
}
