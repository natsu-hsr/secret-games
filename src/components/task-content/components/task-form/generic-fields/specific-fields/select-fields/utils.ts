import type {FormFieldsDto} from '@store/slices/task-slice';

import type {Select} from './types';

type AdaptFieldsToSelectFormArgs = {
  fields: FormFieldsDto;
}

export const adaptFieldsToSelectForm = ({fields}: AdaptFieldsToSelectFormArgs) => {
  // по условиям, select на форме всегда один, все остальные с типом select
  // имеют те же основные поля, и, по сути, являются options
  let select: Select | undefined;
  let selectedOption: string | undefined;

  fields
    .filter(f => f.type === 'select')
    .forEach(f => {
      const {
        name,
        label,
        defaultValue,
        dependentFields,
      } = f;

      // инициализируем впервые, все остальное с типом select будет интерпретироваться как select.options
      if (!select) {
        select = {
          name,
          label,
          options: [],
        };
      }

      if (f.selected) {
        selectedOption = String(f.defaultValue);
      }

      const option = {
        label: String(defaultValue),
        value: String(defaultValue),
        controls: dependentFields ?? [],
      };
  
      select.options.push(option);
    });

  return {
    selectedOption,
    select,
  };
}