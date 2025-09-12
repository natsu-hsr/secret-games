import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom';

import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined'
import {PageLayout} from '@components/page-layout';

import styles from './styles.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout fullSize>
      <div className={styles.bg} />
      <Flex
        className={styles.container}
        vertical
        align='start'
        justify='start'
        gap={16}
      >
        <Title level={1} className={styles.title}>
          Добро пожаловать на платформу <span className={styles.name}>ЛогистИгра</span>
        </Title>
        <Paragraph className={styles.subtitle}>
          Инновационная цифровая платформа развития фундаментальных знаний
           и компетенций в области управления цепями поставок и логистики снабжения
        </Paragraph>
        <Paragraph className={styles.attention}>
          Больше чем игра!
        </Paragraph>
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