import {useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from 'recharts'

import {Loadable} from '@components/loadable';
import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {selectTaskChartData, loadChartDataByRowId, selectTaskCommonData} from '@store/slices/task-slice';

import styles from './styles.module.scss';

export const LinearChart = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();

  const chartData = useAppSelector(selectTaskChartData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadChartDataByRowId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadChartDataByRowId.typePrefix));
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const lineDataKeys = useMemo(
    () => Object.keys(chartData?.[0] ?? {}).filter(k => k !== 'name'),
    [chartData],
  );

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

  return (
    <Loadable
      emptyProps={{
        isEmpty: !chartData?.length,
        emptyMessage: 'Данные графика не найдены',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <div className={styles.container}>
        <ResponsiveContainer className={styles['chart-container']}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="y" />
            <Tooltip />
            {lineDataKeys?.map(lineKey => (
              <Line
                key={lineKey}
                dataKey={lineKey}
                type="monotone"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Loadable>
  )
}
