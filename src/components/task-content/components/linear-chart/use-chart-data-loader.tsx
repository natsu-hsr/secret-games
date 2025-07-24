import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppSelector} from '@store/config/hooks';
import {loadChartDataByRowId, selectTaskCommonData, type ChartLines} from '@store/slices/task-slice';

export const useChartDataLoader = () => {
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const [data, setData] = useState<ChartLines>();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (!tableRowId || !scriptId || !stageId || !userId) {
      console.error('Один из параметров tableRowId || scriptId || stageId || userId '
        + 'не найден, загрузка графика невозможна');
      return;
    }

    loadChartDataByRowId({
      userId,
      scriptId,
      stageId,
      rowId: tableRowId,
    })
      .then(d => {
        setData(d);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [userId, scriptId, stageId, tableRowId]);

  return {
    data,
    isLoading,
    hasError,
  }
}