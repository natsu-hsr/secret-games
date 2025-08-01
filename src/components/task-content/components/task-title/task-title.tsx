import {Button, notification} from 'antd';
import Title from 'antd/es/typography/Title'
import type {AxiosError} from 'axios';
import {useNavigate, useLocation, useParams} from 'react-router-dom'

import {useUserId} from '@shared/hooks';
import {useAppDispatch} from '@store/config/hooks';
import {submitTask} from '@store/slices/task-slice';

import styles from './styles.module.scss';

export const TaskTitle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stageName = searchParams.get('stageName');

  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();

  const handleClick = () => {
    dispatch(submitTask({
      userId: userId ?? '',
      scriptId: scriptId ?? '',
      stageId: stageId ?? '',
    }))
      .unwrap()
      .then(() => {
        notification.success({message: 'Поздравляем, вы завершили задание!'});
        navigate('/tasks', {replace: true});
      })
      .catch((e: AxiosError) => {
        const errorMessage = e?.response?.data;
        console.error('Ошибка при завершении задачи=', errorMessage);
        notification.error({
          message: `При завершении задания произошла ошибка${errorMessage ? ` :${errorMessage}` : ''}`
        });
      });
  }

  return (
    <div className={styles.container}>
      <Title className={styles.title} level={2}>{stageName ?? 'Задание'}</Title>
      <Button
        className={styles.submit}
        type='primary'
        onClick={handleClick}
      >
        Завершить
      </Button>
    </div>
  )
}
