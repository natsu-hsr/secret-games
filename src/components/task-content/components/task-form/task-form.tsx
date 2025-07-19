import {Loadable} from '@components/loadable';

import {BaseForm} from './base-form/base-form';
import {useFormDataLoader} from './use-form-data-loader';

export const TaskForm = () => {
  const {data: formData, isLoading, hasError} = useFormDataLoader();

  console.log('formData=', formData);

  return (
    <Loadable
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
      {formData && <BaseForm formData={formData} />}
    </Loadable>
  )
}
