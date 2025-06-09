import { matchRawFieldTypes } from "../../../components/task-content/components/task-form/task-form-utils";
import type {FormFieldsDto, RawFormFieldDto, RawFormFieldsDto, RawTableDataDto, SortedFormFieldsDto, TableDataDto} from "./task-slice-types"

type ConvertRawTableDataArgs = {
  rawData: RawTableDataDto;
}
export const convertRawTableData = ({rawData}: ConvertRawTableDataArgs): TableDataDto | undefined => {
  if (!rawData?.length) return undefined;

  const configRawEntity = rawData?.shift();
  if (!configRawEntity) return undefined;

  const columns = Object.entries(configRawEntity).map(([k, v]) => ({
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

  const radiosConverted: FormFieldsDto = rawFormFields
    .filter(rf => rf.HTML_type === 'radio')
    .map(ff => convertRawField({rawField: ff}));

  rawFormFields.forEach(rf => {
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
    radios: radiosConverted,
    regularFields: regularConverted,
  };
};
