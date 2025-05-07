import Card from 'antd/es/card/Card'
import Button from 'antd/es/button';
import {useNavigate} from 'react-router-dom';

import styles from './task-group.module.scss';

type TTask = {
  id: number;
  title: string;
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
  const navigate = useNavigate();

  return (
    <Card
      key={group.id}
      className={styles.group}
    >
      <h3>{group.title}</h3>
      <p>{group.description}</p>

      <ul className={styles.tasks}>
        {group.tasks.map(task => (
          <li key={task.id} className={styles.subtask}>
            <span>{task.title}</span>
            <Button
              type="link"
              onClick={() => navigate(`/group/${group.id}/task/${task.id}`)}
            >
              Перейти к заданию
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}
