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

import styles from './styles.module.scss';
import {useChartDataLoader} from './use-chart-data-loader';

const colors = [
  '#8884d8',
  '#84d8a7ff',
  '#eca114ff',
  '#da5050ff',
  '#51aaf3ff',
  '#95d884ff',
  '#d184d8ff',
  '#3f0088ff',
  '#035658ff',
  '#00c569ff',
]

export const LinearChart = () => {
  const {data, isLoading, hasError} = useChartDataLoader();

  const {lineIds, data: chartData} = data ?? {};

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
            <YAxis />
            <Tooltip />
            {lineIds?.map((id, idx) => (
              <Line
                key={id}
                dataKey={id}
                type="monotone"
                stroke={colors?.[idx] ?? '#8884d8'}
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
