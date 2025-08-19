import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom';

import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined'
import {PageLayout} from '@components/page-layout';

import styles from './styles.module.scss';

import logisticsImage from '@assets/logistics_banner.svg';


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
          Добро пожаловать на сайт <span className={styles.name}>логистигра.ру</span>
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
          icon={<PlayCircleOutlined />}
        >
          Перейти к сценариям
        </Button>
      </Flex>
    </PageLayout>
  )
}