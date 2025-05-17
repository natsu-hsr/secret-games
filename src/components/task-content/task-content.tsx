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
import { TaskForm } from "./components/task-form/task-form";

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
    formConfig,
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
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'], styles['map-row'])}>
            <CustomMap data={mapData} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
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
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['tiles-card'])}>
            <CustomTiles tilesData={tilesData} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'])}>
            <TaskForm config={formConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
