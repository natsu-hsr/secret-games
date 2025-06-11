import Title from 'antd/es/typography/Title'
import {Button} from 'antd';
import {useLocation} from 'react-router-dom'

import styles from './task-title.module.scss';

export const TaskTitle = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stageName = searchParams.get('stageName');

  return (
    <div className={styles.container}>
      <Title className={styles.title} level={2}>{stageName ?? 'Задание'}</Title>
      <Button
        className={styles.submit}
        type='primary'
      >
        Завершить выполнение
      </Button>
    </div>
  )
}
