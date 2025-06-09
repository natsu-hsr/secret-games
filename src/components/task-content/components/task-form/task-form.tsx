import Form, {useForm} from 'antd/es/form/Form';
import {Button, Empty} from 'antd';
import cn from 'classnames';

import {useAppSelector} from '../../../../store/config/hooks';
import {selectFormConfigData} from '../../../../store/slices/task-slice';
import {renderFormFields} from './task-form-utils';

import styles from './task-form.module.scss';

export const TaskForm = () => {
  const fields = useAppSelector(selectFormConfigData);
  const [form] = useForm();

  const hasFields = fields?.radios?.length || fields?.regularFields?.length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log('values=', values)
  }

  return (
    hasFields ? (
      <div className={styles.container}>
        <Form
          className={styles.form}
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
        >
          {renderFormFields({fields})}
        </Form>
        <Button
          className={styles['submit-btn']}
          type='primary'
          onClick={() => form.submit()}
        >
          Отправить
        </Button>
      </div>
    ) : (
      <Empty
        className={cn('fh', 'flex-col-center')}
        description='Поля не заданы'
      />
    )
  )
}
