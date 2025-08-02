import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {loadMapDataByTileId, selectTaskCommonData, selectTaskMapData, taskSliceActions} from '@store/slices/task-slice';

export const useMapDataLoader = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
  
  const {tileId, tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const mapData = useAppSelector(selectTaskMapData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadMapDataByTileId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadMapDataByTileId.typePrefix));

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    // но при этом, идет изначальная загрузка данных карты без tileId
    if (!tableRowId) {
      return;
    }
    if (!scriptId || !stageId || !userId) {
      console.error('Один из параметров scriptId || stageId || userId не найден, загрузка графика невозможна');
      return;
    }

    dispatch(taskSliceActions.resetTilesMarkerCoordinates());
  
    dispatch(loadMapDataByTileId({
      userId,
      scriptId,
      stageId,
      tileId: tileId ?? '',
      productId: tableRowId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, scriptId, stageId, userId, tableRowId])

  return {
    data: mapData,
    isLoading,
    hasError,
  }
}