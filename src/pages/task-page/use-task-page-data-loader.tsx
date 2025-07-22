import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch} from '@store/config/hooks';
import {loadTableData, loadMapDataByTileId} from '@store/slices/task-slice';

export const useTaskPageDataLoader = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  
  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();

  useEffect(() => {
    if (!stageId) {
      console.error('Id задачи не найден');
      setError('Идентификатор задачи (stageId) не найден');
      return;
    }
    if (!scriptId) {
      console.error('Id группы не найден');
      setError('Идентификатор сценария (scriptId) не найден');
      return;
    }
    if (!userId) {
      console.error('UserId не найден');
      setError('Идентификатор пользователя не найден');
      return;
    }

    const loadTaskAction = async () => {
      setLoading(true);
      try {
        // симулируем задержку
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        await dispatch(loadTableData({userId, scriptId, stageId}))
          .unwrap();
        await dispatch(loadMapDataByTileId({
          userId,
          scriptId,
          stageId,
          tileId: '',
        })).unwrap();
        setError(undefined);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e : any) {
        console.error('Во время загрузки задания произошла ошибка', e);
        setError(e?.data ?? 'Ошибка при загрузке задания');
      } finally {
        setLoading(false);
      }
    };
    
    loadTaskAction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptId, stageId, userId]);

  return {
    isLoading,
    error,
  }
}