import {matchRawFieldTypes} from '@components/task-content/components/task-form/task-form-utils';

import type {
  FieldControls,
  FormFieldDto,
  FormFieldsDto,
  RawFormFieldDto,
  RawFormFieldsDto,
  RawTableDataDto,
  SortedFormFieldsDto,
  TableDataDto,
} from './task-slice-types'

type ConvertRawTableDataArgs = {
  rawData: RawTableDataDto;
}
export const convertRawTableData = ({rawData}: ConvertRawTableDataArgs): TableDataDto | undefined => {
  if (!rawData?.length) return undefined;

  const configRawEntity = rawData?.shift();
  if (!configRawEntity) return undefined;

  const hiddenColumns: string[] = ['Product_ID']; // TODO: перенести на бэк

  const columns = Object.entries(configRawEntity)
    .filter(([k])=> isNaN(Number(k))) // TODO: убрать костыль как бэк уберет дублирование
    .filter(([k]) => !hiddenColumns.includes(k))
    .map(([k, v]) => ({
    key: k,
    dataIndex: k,
    title: v,
  }));

  const convertedData = rawData.map((rd, i) => ({
    id: rd?.Product_ID ?? i + 1,
    ...rd,
  }));

  return {
    columns,
    data: convertedData,
    options: {
      selectedRowId: convertedData?.[0]?.id ?? '',
    }
  }
}

type ConvertRawFieldArgs = {
  rawField: RawFormFieldDto;
}
export const convertRawField = ({rawField}: ConvertRawFieldArgs) => ({
  name: rawField.HTML_ID,
  label: rawField.HTML_Label,
  type: matchRawFieldTypes({rawFieldType: rawField.HTML_type}),
  defaultValue: rawField.HTML_value,
  disabled: rawField.HTML_enable !== '1', 
})

type ConvertRawFormFieldsArgs = {
  rawFormFields: RawFormFieldsDto;
}
export const convertRawFormFields = ({rawFormFields}: ConvertRawFormFieldsArgs): SortedFormFieldsDto => {
  const regularConverted: FormFieldsDto = [];

  let select: FormFieldDto | undefined;
  let selectedSelect: string | undefined;

  const radiosConverted: FormFieldsDto = rawFormFields
    .filter(rf => rf.HTML_type === 'radio')
    .map(ff => convertRawField({rawField: ff}));

  // обработка select
  rawFormFields.forEach(rf => {
    if (rf.HTML_type === 'select') {
      if (rf.HTML_enable === 'selected') {
        selectedSelect = String(rf.HTML_value); // TODO: 
      }
      if (!select) {
        select = {
          name: rf.HTML_ID,
          label: rf.HTML_Label,
          type: matchRawFieldTypes({rawFieldType: rf.HTML_type}),
          defaultValue: rf.HTML_value,
          disabled: rf.HTML_enable !== '1',
          options: [],
          controls: {},
        };
      }

      const controls: FieldControls = {};

      Object.entries(rf)
        .forEach(([k, v]) => {
          if (!k.endsWith('_enable') || k.startsWith('HTML')) {
            return;
          }

          const key = k.split('_enable')?.[0];

          controls[key] = {
            disabled: v === 'readonly',
            value: v === 'readonly' ? '' : undefined,
          }
        });

      const option = {
        label: rf.HTML_value,
        value: rf.HTML_value,
        controls: controls,
      };

      select.options.push(option);

      return;
    }


    if (radiosConverted.length === 0) {
      regularConverted.push(convertRawField({rawField: rf}));
    } else {
      const prefix = rf.HTML_ID.split('_')[0];

      const parentRadio = radiosConverted.find(pf => pf.name.startsWith(prefix));

      if (parentRadio) {
        const option = {
          name: rf.HTML_ID,
          value: rf.HTML_value,
          label: rf.HTML_Label,
        };

        const optionStr = rf.HTML_Label + ': ' + rf.HTML_value;

        if (parentRadio.options?.length) {
          parentRadio.options.push(option)
        } else {
          parentRadio.options = [option];
        }

        if (parentRadio.optionLabel?.length) {
          parentRadio.optionLabel.push(optionStr)
        } else {
          parentRadio.optionLabel = [optionStr];
        }
      } else {
        regularConverted.push(convertRawField({rawField: rf}));
      }
    }
  })

  return {
    select,
    selectedSelect,
    radios: radiosConverted,
    regularFields: regularConverted,
  };
};
