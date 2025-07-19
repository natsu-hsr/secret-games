import {notification, Button} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import type {AxiosError} from 'axios';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {
  selectTableSelectedRowId,
  selectSelectedTileId,
  submitFormData,
  type TypedFormData,
} from '@store/slices/task-slice';

import {GenericFields} from './generic-fields';
import styles from './styles.module.scss';

interface BaseFormProps {
  formData: TypedFormData
}
export const BaseForm: React.FC<BaseFormProps> = ({formData}) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();
  const productId = useAppSelector(selectTableSelectedRowId);
  const cardHeaderId = useAppSelector(selectSelectedTileId);
  
  const {type, fields} = formData

  const handleFormSubmit = (values: Record<string, unknown>) => {
    const globalParams = {
      userId: userId ?? '',
      scriptId: scriptId ?? '',
      stageId: stageId ?? '',
      productId: productId ?? '',
      cardHeaderId: cardHeaderId ?? '',
    }

    const valuesToSubmit = {
      ...globalParams,
      ...values,
    };

    dispatch(submitFormData(valuesToSubmit))
      .unwrap()
      .then(data => {
        console.log('submit form then data=', data);
        notification.success({message: 'Данные успешно сохранены'});
      })
      .catch((e: AxiosError) => {
        const errorMessage = e?.response?.data;
        console.error('Ошибка при сохранении данных=', errorMessage);
        notification.error({
          message: `При сохранении данных произошла ошибка${errorMessage ? ` :${errorMessage}` : ''}`
        });
      });
  }

  const FieldsComponent = GenericFields[type]

  return (
    <div className={styles.container}>
      {FieldsComponent ? (
        <>
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
          >
            <FieldsComponent form={form} fields={fields} />
          </Form>
          <div className={styles['submit-btn-container']}>
            <Button
              className={styles['submit-btn']}
              type='primary'
              onClick={() => form.submit()}
            >
              Сохранить данные
            </Button>
          </div>
        </>
      ) : (
        <div>Форма для данного типа полей не найдена</div> // TODO: стилизовать сообщение
      )}
    </div>
  )
}