import {useMemo} from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts"

import {Loadable} from "@components/loadable";
import {useAppSelector} from "@store/config/hooks";
import {selectTaskChartData, loadChartDataByRowId} from "@store/slices/task-slice";
import {selectIsThunkPending, selectIsThunkRejected} from "@store/slices/loading-state-slice";

import styles from './linear-chart.module.scss';

export const LinearChart = () => {
  const chartData = useAppSelector(selectTaskChartData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadChartDataByRowId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadChartDataByRowId.typePrefix));

  const lineDataKeys = useMemo(
    () => Object.keys(chartData?.[0] ?? {}).filter(k => k !== 'name'),
    [chartData],
  );

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
