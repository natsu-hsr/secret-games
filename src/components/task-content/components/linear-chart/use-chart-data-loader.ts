import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppSelector} from '@store/config/hooks';
import {
  loadChartDataByRowId,
  selectTaskCommonData,
  uploadChartFromExcel,
  type ChartLines,
} from '@store/slices/task-slice';

export const useChartDataLoader = () => {
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const [data, setData] = useState<ChartLines>();
  const [isTotalHidden, setTotalHidden] = useState<boolean>(false);
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

  useEffect(() => {
    if (!data?.lineIds?.length) {
      return;
    }

    if (isTotalHidden && data.lineIds.includes('Total')) {
      setData(d => ({
        data: d?.data ?? [],
        lineIds: d?.lineIds.filter(id => id !== 'Total') ?? [],
      }));
    } else if (!isTotalHidden && !data.lineIds.includes('Total') && data.lineIds.length > 1) {
      setData(d => ({
        data: d?.data ?? [],
        lineIds: ['Total', ...(d?.lineIds ?? [])],
      }));
    }
  }, [data, isTotalHidden]);

  const uploadFromExcel = useCallback(() => {
    if (!scriptId || !stageId || !tableRowId) {
      console.error('Один из параметров scriptId || stageId || tileId '
        + 'не найден, выгрузка графика невозможна');
      return;
    }

    uploadChartFromExcel({scriptId, stageId, productId: tableRowId})
  }, [scriptId, stageId, tableRowId]);

  return {
    data,
    isTotalHidden,
    setTotalHidden,
    uploadFromExcel,
    isLoading,
    hasError,
  }
}