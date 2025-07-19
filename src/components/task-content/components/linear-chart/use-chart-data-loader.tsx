import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {loadChartDataByRowId, selectTaskChartData, selectTaskCommonData} from '@store/slices/task-slice';

export const useChartDataLoader = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const chartData = useAppSelector(selectTaskChartData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadChartDataByRowId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadChartDataByRowId.typePrefix));

  useEffect(() => {
    if (!tableRowId || !scriptId || !stageId || !userId) {
      console.error('Один из параметров tableRowId || scriptId || stageId || userId '
        + 'не найден, загрузка графика невозможна');
      return;
    }

    dispatch(loadChartDataByRowId({
      userId,
      scriptId,
      stageId,
      rowId: tableRowId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, scriptId, stageId, tableRowId]);

  return {
    data: chartData,
    isLoading,
    hasError,
  }
}