
import Row from 'antd/es/grid/row';
import Col from 'antd/es/grid/col';
import Title from 'antd/es/typography/Title';
import {Empty} from 'antd';
import {useEffect} from 'react';

import {PageLayout} from '../../components/page-layout/page-layout';
import {TaskScript} from '../../components/task-script/task-script';

import {useUserId} from '../../shared/hooks';
import {useAppDispatch, useAppSelector} from '../../store/config/hooks';
import {loadTasksByUserId, selectTasks} from '../../store/slices/tasks-slice';

import styles from './tasks-page.module.scss';

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const {userId} = useUserId();

  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    if (userId) {
      dispatch(loadTasksByUserId({userId}))
    }
  }, [userId]);

  // const handleManuallyLoadTasks = async () => {
  //   const data = await fetchTestTasksByUserId({userId: ''});
  //   console.log('manuallyLoadTasks=', data)
  // }

  return (
    <PageLayout fullSize>
      <Title level={3} className={styles.title}>Список заданий</Title>
      {tasks?.length ? (
        <Row gutter={[16, 16]}>
          {tasks.map(script => (
            <Col
              key={script.id}
              sm={24}
              lg={12}
              xxl={8}
            >
              <TaskScript script={script} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description='Заданий нет' />
      )}
      {/* <Button
        type='primary'
        onClick={handleManuallyLoadTasks}
      >
        Сделать запрос
      </Button> */}
    </PageLayout>
  )
}
