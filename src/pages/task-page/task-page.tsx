import {Skeleton} from 'antd';
import Alert from 'antd/es/alert/Alert';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"

import {TaskContent} from '../../components/task-content/task-content';
import {useAppDispatch, useAppSelector} from '../../store/config/hooks';
import {loadTask, selectTask} from '../../store/slices/task-slice';

import styles from './task-page.module.scss';

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const {taskId} = useParams();
  const task = useAppSelector(selectTask)
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!taskId) {
      console.error('Id задачи не найден');
      setError('Идентефикатор задачи (taskId) не найден');
      return;
    }

    const loadTaskAction = async () => {
      setLoading(true);
      try {
        // симулируем задержку
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        await dispatch(loadTask({id: Number(taskId)})).unwrap();
        setError(undefined);
      } catch (e) {
        console.error('Во время загрузки задания произошла ошибка', e);
        setError('Ошибка при загрузке задания');
      } finally {
        setLoading(false);
      }
    };
    
    loadTaskAction();
  }, []);

  return (
    <Skeleton
      className={styles.spinner}
      active={isLoading}
      loading={isLoading}
      title
      paragraph={{rows: 8}}
    >
      {(() => {
        if (error) {
          return <Alert type="error" description={error} />;
        }

        if (!task) {
          return (
            <Alert
              type="error"
              description="Во время загрузки задания произошла непредвиденная ошибка"
            />
          )
        }

        return <TaskContent task={task} />;
      })()}
    </Skeleton>
  )
}
