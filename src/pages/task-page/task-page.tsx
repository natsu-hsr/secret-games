import {Skeleton, Popover} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import {TaskContent} from '@components/task-content';
import {useAppDispatch} from '@store/config/hooks';
import {taskSliceActions} from '@store/slices/task-slice';

import styles from './styles.module.scss';
import {useTaskPageDataLoader} from './use-task-page-data-loader';

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
  const dispatch = useAppDispatch()
  const {isLoading, error} = useTaskPageDataLoader();

  useEffect(
    () => () => void dispatch(taskSliceActions.resetTaskData()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
