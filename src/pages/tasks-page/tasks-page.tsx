
import Row from 'antd/es/grid/row';
import Col from 'antd/es/grid/col';

import {PageLayout} from '../../components/page-layout/page-layout';
import {TaskGroup} from '../../components/task-group/task-group';

import {mockTaskGroups} from '../../shared/mocks';

import styles from './tasks-page.module.scss';

export const TasksPage = () => {
  return (
    <PageLayout title='Список заданий'>
      <Row gutter={[16, 16]}>
        {mockTaskGroups.map(group => (
          <Col
            key={group.id}
            sm={24}
            lg={12}
            xxl={8}
          >
            <TaskGroup group={group} />
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
