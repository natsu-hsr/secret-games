import Title from "antd/es/typography/Title";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts"

import type {TTaskChartData} from "../../store/slices/task-slice";

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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {lineDataKeys?.map(lineKey => (
            <Line
              key={lineKey}
              type="monotone"
              dataKey={lineKey}
              stroke="#8884d8"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
