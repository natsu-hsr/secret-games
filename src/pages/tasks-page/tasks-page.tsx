import {Button, Empty, Skeleton, Tooltip} from 'antd';
import Card from 'antd/es/card/Card';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import Title from 'antd/es/typography/Title';
import cn from 'classnames';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';

import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import ReloadOutlined from '@ant-design/icons/lib/icons/ReloadOutlined';
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
      <Title level={4} className={styles['script-name']}>{script.name}</Title>
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
            {stage?.iconName && (
              <img
                className={styles['stage-icon']}
                src={`src/assets/task-icons/${stage.iconName.replace('.png', '')}.svg`}
                alt='icon'
              />
            )}
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
                  <Link
                    to={`/script/${script.id}/stage/${stage.id}?stageName=${encodeURIComponent(stage.name)}`}
                  >
                    {stage.name}
                  </Link>
                  {stage.hasResults && (
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
                  )}
                  {stage.hasExtendedResults && (
                    <Link
                      className={styles.link}
                      to={
                        `${window.location.origin}/graph.php?user_id=${userId}
                        &script_id=${script.id}&stage_id=${stage.id}&data_type=ext`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Сводные результаты
                    </Link>
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
