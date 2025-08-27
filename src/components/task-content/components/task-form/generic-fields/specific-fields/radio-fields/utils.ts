import type {FormFieldsDto} from '@store/slices/task-slice';

import type {RadioGroups} from './types';

type ConvertFieldsToRadiosArgs = {
  fields: FormFieldsDto;
}

export const convertFieldsToRadios = ({fields}: ConvertFieldsToRadiosArgs) => {
  const radioGroups: RadioGroups = fields
    .filter(f => f.type === 'radio')
    .map(f => ({
        checked: f.name.endsWith('Flow_Ratio') && f.defaultValue === '1',
        name: f.name,
        value: f.name,
        disabled: f.disabled,
        labels: [],
    }));

  // проходимся по остальным полям и разбиваем их по группам
  fields
    .filter(f => f.type !== 'radio')
    .forEach(f => {
      // группируем по префиксу - он совпадает с родителем
      const radioPrefix = f.name.split('_')[0];
      const parentRadio = radioGroups.find(rg => rg.name.startsWith(radioPrefix));

      if (!parentRadio) {
        return;
      }

      const {defaultValue, label} = f;

      const fieldLabel = label + ': ' + defaultValue;

      parentRadio.labels.push(fieldLabel);
    })

  return radioGroups;
}