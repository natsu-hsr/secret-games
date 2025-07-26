import {notification, type FormInstance} from 'antd';
import type {AxiosError} from 'axios';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectTaskCommonData, submitFormData} from '@store/slices/task-slice';

export const useFormControls = (form: FormInstance) => {
  const dispatch = useAppDispatch();

  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();
  const {tableRowId, tileId} = useAppSelector(selectTaskCommonData) ?? {};
  
  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      await form.validateFields();
    } catch(e) {
      console.log('error!', e);
      return;
    }
    
    const globalParams = {
      userId: userId ?? '',
      scriptId: scriptId ?? '',
      stageId: stageId ?? '',
      productId: tableRowId ?? '',
      cardHeaderId: tileId ?? '',
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

  return {
    handleSubmit,
  }
}