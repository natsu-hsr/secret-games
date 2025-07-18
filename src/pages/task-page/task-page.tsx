import {Skeleton, Popover} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'

import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import {TaskContent} from '@components/task-content';
import {useUserId} from '@shared/hooks';
import {useAppDispatch} from '@store/config/hooks';
import {loadMapDataByTileId, loadTableData} from '@store/slices/task-slice';

import styles from './styles.module.scss';

import errorImage from '@assets/robot-error.webp';


interface ErrorPanelProps {
  error: string | undefined;
}
const ErrorPanel: React.FC<ErrorPanelProps> = ({error}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles['error-wrapper']}>
      <img className={styles['error-image']} src={errorImage} alt="error_image" />
      <Paragraph className={styles['error-text']}>
        <Title level={2} className={styles['error-title']}>Страница не найдена</Title>
        <Paragraph className={styles['error-description']}>
          При загрузке данных произошла непредвиденная ошибка.<br />
          Попробуйте перезагрузить страницу или вернитесь к <Link to='/tasks' replace>списку заданий</Link>
        </Paragraph>
        <Paragraph className={styles['error-popover-wrapper']}>
          Подробнее об ошибке
          <Popover
            content={error}
            trigger="click"
            open={isOpen}
            onOpenChange={() => setOpen(p => !p)}
            placement='right'
          >
            <QuestionCircleOutlined className={styles['error-popover-icon']} />
          </Popover>
        </Paragraph>
      </Paragraph>
    </div>
  );
}

export const TaskPage = () => {
  const dispatch = useAppDispatch();

  // const task = useAppSelector(selectTask)

  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  
  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();

  useEffect(() => {
    if (!stageId) {
      console.error('Id задачи не найден');
      setError('Идентификатор задачи (stageId) не найден');
      return;
    }
    if (!scriptId) {
      console.error('Id группы не найден');
      setError('Идентификатор сценария (scriptId) не найден');
      return;
    }
    if (!userId) {
      console.error('UserId не найден');
      setError('Идентификатор пользователя не найден');
      return;
    }

    const loadTaskAction = async () => {
      setLoading(true);
      try {
        // симулируем задержку
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        await dispatch(loadTableData({userId, scriptId, stageId}))
          .unwrap();
        await dispatch(loadMapDataByTileId({
          userId,
          scriptId,
          stageId,
          tileId: '',
        })).unwrap();
        setError(undefined);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e : any) {
        console.error('Во время загрузки задания произошла ошибка', e);
        setError(e?.data ?? 'Ошибка при загрузке задания');
      } finally {
        setLoading(false);
      }
    };
    
    loadTaskAction();
  }, [scriptId, stageId, userId]);

  return (
    <Skeleton
      className={styles.skeleton}
      active={isLoading}
      loading={isLoading}
      title
      paragraph={{rows: 8}}
    >
      {(() => {
        if (error) {
          return <ErrorPanel error={error} />
        }

        return <TaskContent />;
      })()}
    </Skeleton>
  )
}
