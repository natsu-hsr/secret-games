import Input from "antd/es/input/Input";

import type {RawFieldType, FieldType, FormFieldDto, FormFieldsDto, SortedFieldsDto} from "../../../../store/slices/task-slice"
import FormItem from "antd/es/form/FormItem";
import {Radio} from "antd";

import styles from './task-form.module.scss';

export type RenderRegularFieldsArgs = {
  field: FormFieldDto;
}
export const renderRegularFields = ({field}: RenderRegularFieldsArgs) => {
  const {
    type,
    label,
    defaultValue,
    disabled,
  } = field;

  switch (type) {
    case 'TEXT': return (
      <Input
        defaultValue={typeof defaultValue === 'boolean' ? undefined : defaultValue}
        placeholder={`Введите ${label.toLowerCase()}`}
        disabled={disabled}
      />
    )
    // todo: изменить название
    // case 'RADIO': return (
    //   <Checkbox
    //     defaultChecked={!!defaultValue}
    //     disabled={disabled}
    //   />
    // )
    default: return (
      <Input
        defaultValue={typeof defaultValue === 'boolean' ? undefined : defaultValue}
        placeholder={`Введите ${label.toLowerCase()}`}
        disabled={disabled}
      />
    )
  }
}

export type RenderRadiosFieldsArgs = {
  radios: FormFieldsDto;
}
export const renderRadiosFields = ({radios}: RenderRadiosFieldsArgs) => {
  // const convertedRadio = radios.map(r => {
  //   const label = r.options.map((o: any) => o?.label + ': ' + o?.value)?.join(',');
  //   return {

  //   }
  // })


  return (
    <FormItem
      name="radioValue"
    >
      <Radio.Group
        className={styles['radio-group']}
        // defaultValue={r?.defaultValue}
        options={radios.map(r => ({
          value: r.name,
          label: (
            <div className={styles['radio-label']}>
              {r.optionLabel?.map(ol => (
                <div
                  key={ol}
                  className={styles['radio-label-text']}>
                  {ol}
                </div>
              ))}
            </div>
          ),
          // label: r.optionLabel?.join('; ')
        }))}
      />
    </FormItem>    
  )
}

export type RenderFormFieldsArgs = {
  fields: SortedFieldsDto;
}
export const renderFormFields = ({fields}: RenderFormFieldsArgs) => {
  const {
    radios,
    regularFields,
  } = fields;

  return (
    <>
      {!!radios?.length && renderRadiosFields({radios})}
      {regularFields?.map(f => (
        <FormItem
          key={f.name + f.label + f.defaultValue + f.disabled + f.type}
          name={f.name}
          label={f.label}
        >
          {renderRegularFields({field: f})}
        </FormItem>
      ))}
    </>
  )
}

export type MatchRawFieldTypesArgs = {
  rawFieldType: RawFieldType;
}
export const matchRawFieldTypes = ({rawFieldType}: MatchRawFieldTypesArgs): FieldType => {
  switch (rawFieldType) {
    case 'text': return 'TEXT';
    case 'radio': return 'RADIO';
    case 'select': return 'SELECT';
    default: return 'TEXT';
  }
}