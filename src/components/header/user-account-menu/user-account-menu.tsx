import {Avatar, Divider, Dropdown} from 'antd';
import type {MenuProps} from 'antd/es/menu';
import Flex from 'antd/lib/flex';
import type {FC} from 'react';


import {UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {logout, selectUser} from '@store/slices/auth-slice';

import styles from './styles.module.scss';

import LogoutSvg from '@assets/logout.svg?react';

interface GetItemsArgs {
  onLogout: () => void;
}
const getItems = ({onLogout}: GetItemsArgs): MenuProps['items'] => [
  {
    key: 'account',
    label: 'Мой аккаунт',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    className: `${styles.item} ${styles.important}`,
    key: 'logout',
    label: 'Выйти',
    icon: <LogoutSvg className={`${styles.logo} ${styles.logout}`} />,
    onClick: onLogout
  },
];

export const UserAccountMenu: FC = () => {
  const dispatch = useAppDispatch();

  const {username} = useAppSelector(selectUser) ?? {};

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <Divider className={styles.divider} type='vertical' />
      <Dropdown menu={{items: getItems({onLogout: handleLogout})}}>
      <Flex className={styles.wrapper} align='center' gap={8}>
        {username}
        <Avatar className={styles.avatar} icon={<UserOutlined />} />
      </Flex>
    </Dropdown>
    </>
    
  )
}