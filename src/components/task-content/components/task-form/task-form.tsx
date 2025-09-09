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
          <Header
            tileApiName={tileApiName}
            formNode={(
              <>
                {fields && FieldsComponent && (
                  <>
                    <Form
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
                    </Form>
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
        )}
        {/* {fields && FieldsComponent && (
          <>
            <Divider className={styles.divider} />
            <Title level={5} className={styles['form-title']}>Поля формы</Title>
            <Form
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
        )} */}
      </div>
    </Loadable>
  )
}

