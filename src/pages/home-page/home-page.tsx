import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import {useNavigate} from 'react-router-dom';

import {PageLayout} from '../../components/page-layout/page-layout';

import styles from './home-page.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Flex
        vertical
        align='center'
        justify='center'
      >
        <h1 className={styles.title}>
          Добро пожаловать в LogiFlow
        </h1>
        <p className={styles.subtitle}>
          Платформа для моделирования логистических сценариев
        </p>
        <Button
          type="primary"
          onClick={() => navigate('/tasks')}
        >
          Перейти к заданиям
        </Button>
      </Flex>
    </PageLayout>
  )
}