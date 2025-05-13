import Card from 'antd/es/card/Card'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import cn from 'classnames';
import {Link} from 'react-router-dom';

import styles from './task-group.module.scss';

type TTask = {
  id: number;
  title: string;
  enabled: boolean;
}

type TTaskGroup = {
  id: number;
  title: string;
  description: string;
  tasks: TTask[];
}

interface TaskGroupProps {
  group: TTaskGroup;
}

export const TaskGroup = ({group}: TaskGroupProps) => {
  return (
    <Card
      key={group.id}
      className={styles.group}
    >
      <h3>{group.title}</h3>
      <p>{group.description}</p>

      <ul className={styles.tasks}>
        {group.tasks.map(task => (
          <li key={task.id} className={cn(styles.subtask, !task.enabled && styles.disabled)}>
            
            {task.enabled ? (
              <Link
                to={`/group/${group.id}/task/${task.id}`}
              >
                {task.title}
              </Link>
            ) : (
              <>
                <span>{task.title}</span>
                <LockOutlined />
              </>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
