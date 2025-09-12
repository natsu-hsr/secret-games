import Title from 'antd/es/typography/Title';
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
  '#51aaf3ff',
  '#eca114ff',
  '#95d884ff',
  '#d184d8ff',
  '#3f0088ff',
  '#035658ff',
  '#da5050ff',
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
        <Title level={4} className={styles.title}>Клиентский спрос</Title>
        <ResponsiveContainer className={styles['chart-container']}>
          <LineChart data={chartData} margin={{top: 8, right: 16, bottom: 20, left: -10}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickMargin={2}
              label={{value: 'Период, дн', position: 'bottom', offset: 2}}
            />
            <YAxis label={{value: 'Спрос, шт', angle: -90, position: 'insideLeft', offset: 15}} />
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
