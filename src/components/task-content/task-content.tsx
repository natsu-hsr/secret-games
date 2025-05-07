import Row from "antd/es/grid/row";
import Card from "antd/es/card/Card";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Col from "antd/es/grid/col";

import {CustomMap} from "../custom-map/custom-map";
import {LinearChart} from "../linear-chart/linear-chart";
import {CustomTable} from "../custom-table/custom-table";
import {CustomTiles} from "../custom-tiles/custom-tiles";
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
  } = task;

  const {
    title,
    description,
  } = info;

  return (
    <>
      <Row>
        <Card className={styles.card}>
          <Title level={2}>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card>
      </Row>
      <Row
        className={styles['map-row']}
        gutter={8}
      >
        <Col
          md={24}
          lg={12}
        >
          <Card className={styles.card}>
            <CustomMap data={mapData} />
          </Card>
        </Col>
        <Col
          md={24}
          lg={12}
        >
          <Card className={styles.card} >
            <LinearChart data={chartData} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Card className={styles.card}>
          <CustomTable />
        </Card>
      </Row>
      <Row gutter={8}>
        <Col
          md={24}
          lg={12}
        >
          <Card className={styles.card}>
            <CustomTiles />
          </Card>
        </Col>
        <Col
          md={24}
          lg={12}
        >
          <Card className={styles.card}>
            Форма плиток
          </Card>
        </Col>
      </Row>
    </>
  )
}
