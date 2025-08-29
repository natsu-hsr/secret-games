import {Button, Divider} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
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
    tileId, formData, isLoading, hasError, handleSubmit, isValid, handleValuesChange,
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
        <Header
          info={{
            title: 'Настройка политики управления запасами',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere ' +
              'mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.',
            sections: [
              {
                title: 'Характеристики элемента',
                statistics: [
                  {label: 'Локация', value: 'Япония'},
                  {label: 'Тип склада', value: 'Надежный'},
                  {label: 'Площадь склада', value: '50000'},
                  {label: 'Объем склада', value: '123312'},
                  {label: 'Площадь зоны приемки', value: '30000'},
                  {label: 'Площадь зоны отгрузки', value: '20000'},
                ]
              },
              {
                title: 'Затраты по элементу',
                lists: [
                  {
                    subtitle: 'Постоянные затраты',
                    statistics: [
                      {label: 'Аренда', value: '330000'},
                      {label: 'Коммунальные платежи', value: '30000'},
                      {label: 'Персонал', value: '200000'},
                      {label: 'Поддержка IT', value: '10000'},
                    ]
                  },
                  {
                    subtitle: 'Переменные затраты',
                    statistics: [
                      {label: 'Тариф на приемку', value: '3000'},
                      {label: 'Тариф на хранение', value: '5500'},
                      {label: 'Тариф на комплектацию', value: '1200'},
                      {label: 'Упаковочные материалы', value: '2000'},
                      {label: 'Резервирование площадей', value: '30000'},
                      {label: 'Площадь зоны отгрузки', value: '100'},
                    ]
                  },
                ]
              },
              {
                title: 'Параметры материального потока',
                statistics: [
                  {label: 'Запасы на начало периода', value: '12455'},
                  {label: 'Политика упр. запасами', value: 'Надежная'},
                  {label: 'Параметры политики', value: '3FjnASD'},
                ]
              },
            ]
          }}
        />
        {fields && FieldsComponent && (
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
        )}
      </div>
    </Loadable>
  )
}

