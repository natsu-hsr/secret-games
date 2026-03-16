import {Button} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import {useRef} from 'react';

import {Loadable} from '@components/loadable';

import {GenericFields} from './generic-fields';
import {Header} from './header';
import styles from './styles.module.scss';
import {useTaskForm} from './use-task-form';

export const TaskForm = () => {
  const [form] = useForm();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const {
    tileId,
    tileApiName,
    formData,
    isLoading,
    hasError,
    handleSubmit,
    isValid,
    handleValuesChange,
    isAllFieldsDisabled,
  } = useTaskForm(form);
  
  const {type, fields} = formData ?? {};
  
  const FieldsComponent = type && GenericFields[type];

  return (
    <Loadable
      skeleton
      emptyProps={{
        isEmpty: !formData?.fields?.length && tileApiName !== 'stage_card_transport',
        emptyMessage: tileId ? 'Поля не заданы' : 'Выберите активный блок',
      }}
      loadingProps={{isLoading}}
      errorProps={{hasError}}
    >
      <div className={styles.container} ref={scrollContainerRef}>
        {tileApiName && (
          <Form
            key={tileId}
            form={form}
            preserve={false}
            layout='vertical'
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
          >
          <Header
            tileApiName={tileApiName}
            form={form}
            formNode={(
              <>
                {fields && FieldsComponent && (
                  <>
                    {/* <Form
                      key={tileId}
                      form={form}
                      preserve={false}
                      layout='vertical'
                      onFinish={handleSubmit}
                      onValuesChange={handleValuesChange}
                    >
                      <FieldsComponent
                        form={form}
                        fields={fields}
                        scrollContainerRef={scrollContainerRef}
                      />
                    </Form> */}
                    <FieldsComponent
                        form={form}
                        fields={fields}
                        scrollContainerRef={scrollContainerRef}
                      />
                    <div className={styles['submit-btn-container']}>
                      <Button
                        className={styles['submit-btn']}
                        type='primary'
                        onClick={form.submit}
                        disabled={!isValid || isAllFieldsDisabled}
                      >
                        Сохранить данные
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          />
          </Form>
        )}
      </div>
    </Loadable>
  )
}

