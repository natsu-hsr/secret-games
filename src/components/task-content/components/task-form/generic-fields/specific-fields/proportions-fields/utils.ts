import type {FormFieldsDto} from '@store/slices/task-slice';

import type {ProportionFormField} from './types';

export const convertFieldsToProportions = (fields: FormFieldsDto): ProportionFormField[] => {
  const groupedFields = fields.reduce((acc, cur) => {
    const parentId = cur?.parentId;

    if (!parentId) {
      return acc;
    }

    if (!acc[parentId]) {
      acc[parentId] = {...cur};
    }
    
    if (cur.disabled) { // поле техническое, в форму попасть не должно, выводим его как preLabel
      acc[parentId].preLabel = {
        label: cur.label,
        value: String(cur.defaultValue),
      };
    } else {
      acc[parentId]= {
        ...cur,
        defaultValue: Number(cur.defaultValue),
      };
    }

    return acc;
  }, {} as Record<string, ProportionFormField>);

  return Object.values(groupedFields);
}