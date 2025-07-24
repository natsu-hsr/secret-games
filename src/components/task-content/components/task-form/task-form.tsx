import {Loadable} from '@components/loadable';

import {BaseForm} from './base-form/base-form';
import {useFormDataLoader} from './use-form-data-loader';

export const TaskForm = () => {
  const {data: formData, isLoading, hasError} = useFormDataLoader();

  return (
    <Loadable
      skeleton
      emptyProps={{
        isEmpty: !formData?.fields?.length,
        emptyMessage: 'Поля не заданы',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <div style={{height: '100%', width: '100%',}}>
        {formData && <BaseForm formData={formData} />}
      </div>
    </Loadable>
  )
}
