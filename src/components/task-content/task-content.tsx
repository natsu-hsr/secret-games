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
import {TaskForm} from "./components/task-form/task-form";

import styles from './task-content.module.scss';
import {Emptiable} from "../emptiable/emptiable";

export const TaskContent = () => {
  const title = 'Тест';
  const description = 'Тестовое описание';

  return (
    <div className={styles.container}>
      <Row>
        <Card className={styles.card}>
          <Emptiable
            ready={false}
            emptyMessage="Данные отсутствуют"
          >
            <Title level={2}>{title}</Title>
            <Paragraph>{description}</Paragraph>
          </Emptiable>
        </Card>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'], styles['map-row'])}>
            <CustomMap />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'], styles['map-row'])} >
            <LinearChart />
          </Card>
        </Col>
      </Row>
      <Row>
        <Card className={styles.card}>
          <CustomTable />
        </Card>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['tiles-card'])}>
            <CustomTiles />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className={cn(styles.card, styles['min-h'])}>
            <TaskForm />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
