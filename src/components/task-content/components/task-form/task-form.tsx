import {Button} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import {useRef} from 'react';

import {Loadable} from '@components/loadable';

import {GenericFields} from './generic-fields';
import styles from './styles.module.scss';
import {useTaskForm} from './use-task-form';

export const TaskForm = () => {
  const [form] = useForm();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const {
    tileId, formData, isLoading, hasError, handleSubmit, isValid, setValid,
  } = useTaskForm(form);
  
  const {type, fields} = formData ?? {};
  
  const FieldsComponent = type && GenericFields[type];

  return (
    <Loadable
      skeleton
      emptyProps={{
        isEmpty: !formData?.fields?.length,
        emptyMessage: tileId ? 'Поля не заданы' : 'Выберите активный блок',
      }}
      loadingProps={{isLoading}}
      errorProps={{hasError}}
    >
      <div className={styles.container} ref={scrollContainerRef}>
        {fields && FieldsComponent && (
          <>
          <Form
            key={tileId}
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            preserve={false}
          >
            <FieldsComponent
              form={form}
              fields={fields}
              scrollContainerRef={scrollContainerRef}
              setValid={setValid}
            />
          </Form>
          <div className={styles['submit-btn-container']}>
            <Button
              className={styles['submit-btn']}
              type='primary'
              onClick={form.submit}
              disabled={!isValid}
            >
              Сохранить данные
            </Button>
          </div>
          </>
        )}
      </div>
    </Loadable>
  )
}

