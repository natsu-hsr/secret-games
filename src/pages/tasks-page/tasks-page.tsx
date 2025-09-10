import {Button, Empty, Flex, Skeleton, Tooltip} from 'antd';
import Card from 'antd/es/card/Card';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import Title from 'antd/es/typography/Title';
import cn from 'classnames';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';

import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import PieChartOutlined from '@ant-design/icons/lib/icons/PieChartOutlined';
import ProjectOutlined from '@ant-design/icons/lib/icons/ProjectOutlined';
import ReloadOutlined from '@ant-design/icons/lib/icons/ReloadOutlined';
import TrophyOutlined from '@ant-design/icons/lib/icons/TrophyOutlined';
import {PageLayout} from '@components/page-layout';
import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import type {User} from '@store/slices/auth-slice';
import {selectIsThunkPending} from '@store/slices/loading-state-slice';
import {loadTaskStatus, loadTasksByUserId, selectTasks, type ScriptDto} from '@store/slices/tasks-slice';

import styles from './styles.module.scss';

interface TaskScriptProps {
  script: ScriptDto;
  userId: User['userId'];
}
const TaskScript = ({script, userId}: TaskScriptProps) => {
  const dispatch = useAppDispatch();

  return (
    <Card className={styles.group}>
      <Flex justify='space-between' align='flex-start'>
        <Title level={4} className={styles['script-name']}>
          {script.name}
        </Title>
        {script?.iconName && (
          <img
            className={styles['stage-icon']}
            src={`/task-icons/${script.iconName.replace('.png', '')}.svg`}
            alt='icon'
          />
        )}
      </Flex>
      
      <ul className={styles.tasks}>
        {script.stages.map(stage => (
          <li
            key={stage.id}
            className={cn(
              styles.subtask,
              stage.disabled && styles.disabled,
              stage.pending && styles.pending,
            )}
          >
            {(() => {
              if (stage.disabled) {
                return (
                  <>
                    <span>{stage.name}</span>
                    <LockOutlined />
                  </>
                );
              }

              if (stage.pending) {
                return (
                  <>
                    <span>{stage.name}</span>
                    <LoadingOutlined />
                    <Tooltip title="Проверить статус" placement='topLeft'>
                      <Button
                        className={styles.reload}
                        icon={<ReloadOutlined />}
                        onClick={() => dispatch(loadTaskStatus({userId, scriptId: script.id, stageId: stage.id}))}
                      />
                    </Tooltip>
                  </>
                );
              }

              return (
                <>
                  <Link to={`/script/${script.id}/stage/${stage.id}`}>
                    {stage.name}
                  </Link>
                  {stage.hasResults && (
                    <>
                      <Tooltip title='Результаты' placement='topLeft'>
                        <Link
                          className={styles.link}
                          to={
                            `${window.location.origin}/graph.php?user_id=${userId}
                            &script_id=${script.id}&stage_id=${stage.id}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TrophyOutlined />
                        </Link> 
                      </Tooltip>
                      <Tooltip title='Аналитика по попыткам' placement='topLeft'>
                        <Link
                          className={styles.link}
                          to={
                            `${window.location.origin}/graph.php?user_id=${userId}
                            &script_id=${script.id}&stage_id=${stage.id}&data_type=all`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PieChartOutlined />
                        </Link> 
                      </Tooltip>
                    </>
                  )}
                  {/* //todo: ниже правильная логика, но временно ссылки показываем всегда */}
                  {/* {stage.hasResults ? (
                    <>
                      <span>{stage.name}</span>
                      <Link
                        className={styles.link}
                        to={
                          `${window.location.origin}/graph.php?user_id=${userId}
                          &script_id=${script.id}&stage_id=${stage.id}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Результаты
                      </Link>
                    </>
                  ) : (
                    <Link
                        to={`/script/${script.id}/stage/${stage.id}`}>
                          {stage.name}
                      </Link>
                  )} */}
                  {stage.hasExtendedResults && (
                    <Tooltip title='Сводные результаты' placement='topLeft'>
                      <Link
                        className={styles.link}
                        to={
                          `${window.location.origin}/graph.php?user_id=${userId}
                          &script_id=${script.id}&stage_id=${stage.id}&data_type=ext`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ProjectOutlined />
                      </Link>
                    </Tooltip>
                  )}
                </>
              )
            })()}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const {userId} = useUserId();

  const tasks = useAppSelector(selectTasks);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadTasksByUserId.typePrefix));

  useEffect(() => {
    if (userId) {
      dispatch(loadTasksByUserId({userId}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <PageLayout fullSize>
      {userId ? (
        <Skeleton loading={isLoading}>
        <Title level={3} className={styles.title}>Список сценариев</Title>
        {tasks?.length ? (
          <Row gutter={[16, 16]}>
            {tasks.map(script => (
              <Col
                className='fw'
                key={script.id}
                sm={24}
                lg={12}
                xxl={8}
              >
                <TaskScript userId={userId} script={script} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description='Заданий нет' />
        )}
      </Skeleton>
      ) : (
        <div>Идентификатор пользователя не найден</div>
      )}
    </PageLayout>
  )
}
