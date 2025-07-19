import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {loadTilesDataByRowId, selectTaskCommonData, selectTaskTilesData} from '@store/slices/task-slice';

export const useTilesDataLoader = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();

  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const tilesData = useAppSelector(selectTaskTilesData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadTilesDataByRowId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadTilesDataByRowId.typePrefix));

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    if (!tableRowId) {
      return;
    }
    if (!scriptId || !stageId || !userId) {
      console.error('Один из параметров scriptId || stageId || userId не найден, загрузка графика невозможна');
      return;
    }

    dispatch(loadTilesDataByRowId({
      userId,
      scriptId,
      stageId,
      rowId: tableRowId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowId, scriptId, stageId, userId]);

  return {
    data: tilesData,
    isLoading,
    hasError,
  }
};