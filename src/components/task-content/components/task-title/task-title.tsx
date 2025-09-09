import {Button, Flex, notification, Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import type {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'

import {useUserId} from '@shared/hooks';
import {useAppDispatch} from '@store/config/hooks';
import {loadInfo, submitTask, type TaskInfo} from '@store/slices/task-slice';

import styles from './styles.module.scss';

export const TaskTitle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [info, setInfo] = useState<TaskInfo | undefined>();

  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();

  useEffect(() => {
    if (!userId || !scriptId || !stageId) {
      return;
    }

    loadInfo({
      userId,
      scriptId,
      stageId,
    }).then(data => setInfo(data));
  }, [userId, scriptId, stageId])

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
      <Flex vertical gap={8}>
        <Title className={styles.title} level={2}>{info?.title ?? 'Задание'}</Title>
        {info?.description && (
          <Typography.Text type='secondary' className={styles.description}>
            {info?.description}
          </Typography.Text>
        )}
      </Flex>
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
