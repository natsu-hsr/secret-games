import Form, {useForm} from 'antd/es/form/Form';
import {Button, Empty} from 'antd';
import cn from 'classnames';

import { LayoutSpin } from '../layout-spin/layout-spin';
import { selectIsThunkPending } from '../../../../store/slices/loading-state-slice';
import {useAppSelector} from '../../../../store/config/hooks';
import {loadFormDataByTileParams, selectFormConfigData} from '../../../../store/slices/task-slice';
import {renderFormFields} from './task-form-utils';

import styles from './task-form.module.scss';

export const TaskForm = () => {
  const [form] = useForm();

  const fields = useAppSelector(selectFormConfigData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadFormDataByTileParams.typePrefix));

  const hasFields = fields?.radios?.length || fields?.regularFields?.length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log('values=', values)
  }

  return (
    <LayoutSpin spinning={isLoading} tip='Загрузка...'>
      {
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
            <div className={styles['submit-btn-container']}>
              <Button
                className={styles['submit-btn']}
                type='primary'
                onClick={() => form.submit()}
              >
                Сохранить данные формы
              </Button>
            </div>
          </div>
        ) : (
          <Empty
            className={cn('fh', 'flex-col-center')}
            description='Поля не заданы'
          />
        )
      }
    </LayoutSpin>
  )
}
