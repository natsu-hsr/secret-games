import {Radio} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input/Input';

import type {FormFieldDto, FormFieldsDto} from '@store/slices/task-slice'

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
    case 'text': return (
      <Input
        defaultValue={typeof defaultValue === 'boolean' ? undefined : defaultValue}
        placeholder={`Введите ${label.toLowerCase()}`}
        disabled={disabled}
      />
    )
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