import Title from "antd/es/typography/Title";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts"

import type {TTaskChartData} from "../../../../store/slices/task-slice";

import styles from './linear-chart.module.scss';

interface LinearChartProps {
  data: TTaskChartData;
}

export const LinearChart = ({data}: LinearChartProps) => {
  const lineDataKeys = Object.keys(data?.[0] ?? {})
    .filter(k => k !== 'name');


  return (
    <div className={styles.container}>
      <Title level={4} className={styles.title}>Спрос: Продукт / Узел</Title>
      <ResponsiveContainer className={styles['chart-container']}>
        <LineChart data={data}>
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
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
