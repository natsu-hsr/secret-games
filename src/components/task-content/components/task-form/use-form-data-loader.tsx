import type {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppSelector} from '@store/config/hooks';
import {selectTaskCommonData, type TypedFormData} from '@store/slices/task-slice';
import {manuallyFetchFormDataByTileParams} from '@store/slices/task-slice';

export const useFormDataLoader = () => {
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();
    
  const {tileId, tileApiName, tableRowId} = useAppSelector(selectTaskCommonData) ?? {};
  
  const [formData, setFormData] = useState<TypedFormData | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

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

    setLoading(true);

    manuallyFetchFormDataByTileParams({
      stageId,
      scriptId,
      apiName: tileApiName,
      tileId,
      rowId: tableRowId,
      userId,
    })
      .then(data => setFormData(data))
      .catch((e: AxiosError) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, tileApiName, tableRowId]);

  useEffect(() => {
    // если активной плитки нет, но старые данные по форме остались, стираем их
    if ((!tileId || !tileApiName) && formData?.fields?.length && formData?.fields?.length > 0) {
      setFormData(undefined);
      setError(false);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, tileApiName]);

  return {
    data: formData,
    isLoading,
    hasError,
  }
}