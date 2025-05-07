import {Spin} from 'antd';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"

import {TaskContent} from '../../components/task-content/task-content';
import {useAppDispatch} from '../../store/config/hooks';
import {type TTask, loadTask} from '../../store/slices/task-slice';

import styles from './task-page.module.scss';

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const {taskId} = useParams();
  const [task, setTask] = useState<TTask | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!taskId) {
      console.error('Id задачи не найден');
      setError('Идентефикатор задачи (taskId) не найден');
      return;
    }

    async function loadTaskAction() {
      try {
        setLoading(true);
        const loadedTask = await dispatch(loadTask({id: Number(taskId)})).unwrap();
        setTask(loadedTask);
        setError(undefined);
      } catch(e) {
        console.error('Во время загрузки задания произошла ошибка', e);
        setError(e as string);
      } finally {
        setLoading(false);
      }
    }
    
    loadTaskAction();
  }, []);

  return (
    <Spin
      spinning={isLoading}
    >
      <div className={styles.container}>
        {(() => {
          if (!task || error) {
            return (
              <div>
                {error ?? 'Во время загрузки задания произошла непредвиденная ошибка'}
              </div>
            )
          }

          return <TaskContent task={task} />;
        })()}
      </div>
    </Spin>
  )
}
