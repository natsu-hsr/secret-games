import Card from 'antd/es/card/Card'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import Title from 'antd/es/typography/Title';
import {Button} from 'antd';
import cn from 'classnames';
import {Link} from 'react-router-dom';

import {useUserId} from '../../shared/hooks';
import type {ScriptDto} from '../../store/slices/tasks-slice';

import styles from './task-script.module.scss';

interface TaskScriptProps {
  script: ScriptDto;
}

export const TaskScript = ({script}: TaskScriptProps) => {
  const {userId} = useUserId();

  const handleResultsClick = (scriptId: string, stageId: string, userId: string) => {
    const url = `http://2.59.41.201/graph.php?student_id=${userId}&script_id=${scriptId}&stage_id=${stageId}`;
    window.open(url, '_blank');
  }

  return (
    <Card
      key={script.id}
      className={styles.group}
    >
      <Title level={4}>{script.name}</Title>

      <ul className={styles.tasks}>
        {script.stages.map(stage => (
          <li key={stage.id} className={cn(styles.subtask, !stage.active && styles.disabled)}>
            {stage.active ? (
              <>
                <Link
                  to={`/script/${script.id}/stage/${stage.id}`}
                >
                  {stage.name}
                </Link>
                {script.hasResults && (
                  <Button
                    className={styles['result-btn']}
                    type='default'
                    onClick={() => userId && handleResultsClick(script.id, stage.id, userId)}
                  >
                    Посмотреть ответ
                  </Button>
                )}
              </>
            ) : (
              <>
                <span>{stage.name}</span>
                <LockOutlined />
              </>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
