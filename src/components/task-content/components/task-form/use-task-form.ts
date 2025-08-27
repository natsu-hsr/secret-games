import {notification, type FormInstance} from 'antd';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {
  selectTaskCommonData,
  selectFormData,
  loadFormDataByTileParams,
  submitFormData,
  selectTilesMarkerData,
} from '@store/slices/task-slice';

export const useTaskForm = (form: FormInstance) => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
    
  const {tileId, transportId, tileApiName, tableRowId} = useAppSelector(selectTaskCommonData) ?? {};
  
  const tilesMarkerData = useAppSelector(selectTilesMarkerData);
  const formData = useAppSelector(selectFormData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadFormDataByTileParams.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadFormDataByTileParams.typePrefix));
  const [isValid, setValid] = useState<boolean>(true);

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    if (!(tileId || transportId) || !tileApiName || !tableRowId) {
      return;
    }

    if (!stageId || !scriptId || !userId) {
      console.error('Не наден один или несколько параметров: !stageId || !scriptId || !userId');
      console.error(`stageId=${stageId}, scriptId=${scriptId}, userId=${userId}`)
      return;
    }

    setValid(true);

    dispatch(loadFormDataByTileParams({
      stageId,
      scriptId,
      apiName: tileApiName,
      tileId: tileId ?? transportId ?? '',
      rowId: tableRowId,
      userId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, transportId, tileApiName, tableRowId, userId, scriptId, stageId]);

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

      let routesMarkerData: string = '';

      if (
        tileId 
          && tilesMarkerData?.[tileId]?.routes 
          && tilesMarkerData[tileId].routes.length > 0
      ) {
        tilesMarkerData[tileId].routes.forEach(r => {
          routesMarkerData += `${r.toId}:${r.distance},`
        })
        routesMarkerData = routesMarkerData?.slice(0, -1);
      }

      const valuesToSubmit = {
        ...globalParams,
        ...values,
        ...(routesMarkerData.length > 0 ? {[`${tileId}_arc_distance_straight`]: routesMarkerData} : {})
      };

      await dispatch(submitFormData(valuesToSubmit)).unwrap();
      notification.success({message: 'Данные успешно сохранены'});
    } catch {
      notification.error({message: 'Ошибка при сохранении данных'});
    }
  }

  const handleValuesChange = (_: unknown, allValues: Record<string, unknown>) => {
    if (formData?.type !== 'proportions') {
      return;
    }
    
    const proportionsFieldsSum = Object.values(allValues)
      .map(val => Number(val || 0))
      .reduce((acc, cur) => acc += cur, 0)

    setValid(proportionsFieldsSum <= 1)
  }
  
  return {
    tileId,
    formData,
    isLoading,
    hasError,
    handleSubmit,
    handleValuesChange,
    isValid,
    setValid,
  }
};