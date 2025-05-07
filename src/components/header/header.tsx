import {Flex, Layout, Menu} from 'antd';
import RocketOutlined from '@ant-design/icons/lib/icons/RocketOutlined';
import {useLocation} from 'react-router-dom';

import styles from './header.module.scss';

export const Header = () => {
  const location = useLocation();

  return (
    <Layout.Header className={styles.header}>
      <Flex align='center' gap={8}>
        <RocketOutlined className={styles.logo}/>
        <div className={styles.title}>
          ЛогистИгра
        </div>
      </Flex>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="home">Домой</Menu.Item>
        <Menu.Item key="tasks">Задания</Menu.Item>
        <Menu.Item key="profile">Профиль</Menu.Item>
      </Menu>
    </Layout.Header>
  )
}
