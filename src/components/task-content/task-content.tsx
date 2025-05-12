import Row from "antd/es/grid/row";
import Card from "antd/es/card/Card";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Col from "antd/es/grid/col";
import cn from 'classnames';

import {
  CustomMap,
  CustomTable,
  CustomTiles,
  LinearChart,
} from './components';
import type {TTask} from "../../store/slices/task-slice"

import styles from './task-content.module.scss';

interface TaskContentProps {
  task: TTask;
}

export const TaskContent = ({task}: TaskContentProps) => {
  const {
    info,
    mapData,
    chartData,
    tableData,
    tilesData,
  } = task ?? {};

  const {
    title,
    description,
  } = info ?? {};

  return (
    <div className={styles.container}>
      <Row>
        <Card className={styles.card}>
          <Title level={2}>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card>
      </Row>
      <Row gutter={[12, 12]}>
        <Col flex={1} md={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'], styles['map-row'])}>
            <CustomMap data={mapData} />
          </Card>
        </Col>
        <Col flex={1} md={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'], styles['map-row'])} >
            <LinearChart data={chartData} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Card className={styles.card}>
          <CustomTable tableData={tableData} />
        </Card>
      </Row>
      <Row gutter={[12, 12]}>
        <Col flex={1} xs={24} md={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'])}>
            <CustomTiles tilesData={tilesData} />
          </Card>
        </Col>
        <Col flex={1} xs={24} md={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'])}>
            Форма плиток
          </Card>
        </Col>
      </Row>
    </div>
  )
}
