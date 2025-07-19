import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {loadMapDataByTileId, selectTaskCommonData, selectTaskMapData} from '@store/slices/task-slice';

export const useMapDataLoader = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
  
  const {tileId} = useAppSelector(selectTaskCommonData) ?? {};

  const mapData = useAppSelector(selectTaskMapData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadMapDataByTileId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadMapDataByTileId.typePrefix));

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    // но при этом, в компоненте таблицы идет изначальная загрузка данных карты без tileId!
    if (!tileId) {
      return;
    }
    if (!scriptId || !stageId || !userId) {
      console.error('Один из параметров scriptId || stageId || userId не найден, загрузка графика невозможна');
      return;
    }
  
    dispatch(loadMapDataByTileId({
      userId,
      scriptId,
      stageId,
      tileId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, scriptId, stageId, userId])

  return {
    data: mapData,
    isLoading,
    hasError,
  }
}