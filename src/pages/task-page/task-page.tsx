import {Skeleton} from 'antd';
import Alert from 'antd/es/alert/Alert';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"

import {TaskContent} from '@components/task-content/task-content';
import {useAppDispatch} from '@store/config/hooks';
import {loadMapDataByTileId, loadTableData} from '@store/slices/task-slice';

import styles from './task-page.module.scss';

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  // const task = useAppSelector(selectTask)

  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  
  const {scriptId, stageId} = useParams();

  useEffect(() => {
    if (!stageId) {
      console.error('Id задачи не найден');
      setError('Идентефикатор задачи (stageId) не найден');
      return;
    }
    if (!scriptId) {
      console.error('Id группы не найден');
      setError('Идентефикатор сценария (scriptId) не найден');
      return;
    }

    const loadTaskAction = async () => {
      setLoading(true);
      try {
        // симулируем задержку
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        await dispatch(loadTableData({scriptId, stageId}))
          .unwrap();
        await dispatch(loadMapDataByTileId({
          scriptId,
          stageId,
          tileId: '',
        })).unwrap();
        setError(undefined);
      } catch (e) {
        console.error('Во время загрузки задания произошла ошибка', e);
        setError('Ошибка при загрузке задания');
      } finally {
        setLoading(false);
      }
    };
    
    loadTaskAction();
  }, [scriptId, stageId]);

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

        return <TaskContent />;
      })()}
    </Skeleton>
  )
}
