import Row from "antd/es/grid/row";
import Card from "antd/es/card/Card";
import Col from "antd/es/grid/col";
import cn from 'classnames';

import {
  CustomMap,
  CustomTable,
  CustomTiles,
  LinearChart,
  TaskTitle,
  TaskForm,
} from './components';

import styles from './task-content.module.scss';

export const TaskContent = () => (
  <div className={styles.container}>
    <Row>
      <Card className={styles.card}>
        <TaskTitle />
      </Card>
    </Row>
    <Row>
      <Card className={cn(styles.card, styles['min-h'])}>
        <CustomMap />
      </Card>
    </Row>
    <Row>
      <Card className={styles.card}>
        <CustomTable />
      </Card>
    </Row>
    <Row>
      <Card className={cn(styles.card, styles['min-h'])} >
        <LinearChart />
      </Card>
    </Row>
    <Row gutter={[12, 12]}>
      <Col xs={24} lg={12}>
        <Card className={cn(styles.card, styles['min-h'])}>
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
