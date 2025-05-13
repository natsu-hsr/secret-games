import Form, {useForm} from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Title from 'antd/es/typography/Title';
import {Empty, Input} from 'antd';

import type {TFormConfig} from '../../../../store/slices/task-slice/task-slice-types';

import styles from './task-form.module.scss';

interface TaskFormProps {
  config: TFormConfig | undefined;
}

export const TaskForm = ({config}: TaskFormProps) => {
  const [form] = useForm();
  const {
    title,
    fields,
  } = config ?? {};

  return (
    config ? (
      <div className={styles.container}>
        <Title level={4} className={styles.title}>{title}</Title>
        <Form
          className={styles.form}
          form={form}
          layout='vertical'
        >
          {fields?.map(f => (
            <FormItem
              key={f.name}
              name={f.name}
              label={f.label}
            >
              {(() => {
                switch(f.type) {
                  case 'TEXT': return (
                    <Input
                      placeholder={`Введите ${f.label.toLowerCase()}`}
                    />
                  );
                  default: return <Input />;
                }
              })()}
            </FormItem>
          ))}
        </Form>
      </div>
    ) : (
      <Empty
        className={styles.empty}
        description='Нет полей'
      />
    )
  )
}
