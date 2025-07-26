import {notification, type FormInstance} from 'antd';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {selectTaskCommonData, selectFormData, loadFormDataByTileParams, submitFormData} from '@store/slices/task-slice';

export const useTaskForm = (form: FormInstance) => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
    
  const {tileId, tileApiName, tableRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const formData = useAppSelector(selectFormData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadFormDataByTileParams.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadFormDataByTileParams.typePrefix));
  const [isValid, setValid] = useState<boolean>(true);

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    if (!tileId || !tileApiName || !tableRowId) {
      return;
    }

    if (!stageId || !scriptId || !userId) {
      console.error('Не наден один или несколько параметров: !stageId || !scriptId || !userId');
      console.error(`stageId=${stageId}, scriptId=${scriptId}, userId=${userId}`)
      return;
    }

    dispatch(loadFormDataByTileParams({
      stageId,
      scriptId,
      apiName: tileApiName,
      tileId,
      rowId: tableRowId,
      userId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, tileApiName, tableRowId, userId, scriptId, stageId]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      await form.validateFields();
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

      await dispatch(submitFormData(valuesToSubmit)).unwrap();
      notification.success({message: 'Данные успешно сохранены'});
    } catch {
      notification.error({message: 'Ошибка при сохранении данных'});
    }
  }
  
  return {
    tileId,
    formData,
    isLoading,
    hasError,
    handleSubmit,
    isValid,
    setValid,
  }
};