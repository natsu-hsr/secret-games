import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import {useNavigate} from 'react-router-dom';

import {PageLayout} from '../../components/page-layout/page-layout';
import logisticsImage from '/src/assets/logistics_banner.svg'; // вставь свою SVG

import styles from './home-page.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout fullSize>
      <Flex
        vertical
        align='center'
        justify='start'
        gap={8}
      >
        <Title level={1} className={styles.title}>
          Добро пожаловать на сайт <span className={styles.name}>логистигра.рф</span>
        </Title>
        <Paragraph className={styles.subtitle}>
          Платформа для моделирования логистических сценариев в обучающих целях
        </Paragraph>
        <img
          className={styles.banner}
          src={logisticsImage}
          alt="Logistics"
        />
        <Button
          className={styles.button}
          type="primary"
          onClick={() => navigate('/tasks')}
        >
          Перейти к заданиям
        </Button>
      </Flex>
    </PageLayout>
  )
}