import {useMemo} from 'react';

import {Loadable} from '@components/loadable';
import {useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {
  loadFormDataByTileParams,
  selectFormConfigData,
} from '@store/slices/task-slice';

import {BaseForm} from './base-form/base-form';

export const TaskForm = () => {
  const fields = useAppSelector(selectFormConfigData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadFormDataByTileParams.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadFormDataByTileParams.typePrefix));

  const {
    select,
    radios,
    regularFields,
  } = fields ?? {};
  
  const hasActiveFields = useMemo(
    () => !!(radios?.length || regularFields?.length || select?.name),
    [regularFields, radios, select],
  );

  return (
    <Loadable
      emptyProps={{
        isEmpty: !hasActiveFields,
        emptyMessage: 'Поля не заданы',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <BaseForm fields={fields} />
    </Loadable>
  )
}
