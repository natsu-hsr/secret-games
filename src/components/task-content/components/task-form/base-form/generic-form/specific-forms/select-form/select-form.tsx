import Form, {useForm} from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import {useState, type FC} from 'react';

import type {FormFieldsDto} from '@store/slices/task-slice';

import {adaptFieldsToSelectForm} from './utils';
import type {GenericFormProps} from '../../generic-form';

export const SelectForm: FC<GenericFormProps> = ({
  classNames, fields,
}) => {
  const [form] = useForm();
  const [textFields, setTextFields] = useState<FormFieldsDto>(() => fields.filter(f => f.type === 'text'));

  const {
    select,
    selectedOption,
  } = adaptFieldsToSelectForm({fields});

  const {wrapperClassName} = classNames ?? {};

  const handleSelectOptionChange = (value: string) => {
    const selectedOptionControls = select?.options?.find(o => o.value === value)?.controls;
  
    if (!selectedOptionControls) {
      console.error(`selectedOptionControls соответствующих значению ${value} не найдено`);
      return;
    }

    console.log('selectedOptionControls=', selectedOptionControls);
  
    const updatedFields: FormFieldsDto = textFields?.map(tf => {
      const fieldControl = selectedOptionControls.find(control => tf.name.endsWith(control.name));

      if (!fieldControl) {
        return tf;
      }

      return ({
        ...tf,
        disabled: fieldControl?.disabled ?? false,
        defaultValue: fieldControl?.disabled ? '' : tf.defaultValue,
      })
    });

    setTextFields(updatedFields);
  }

  return (
    <Form
      className={wrapperClassName}
      form={form}
      layout='vertical'
      // onFinish={handleFormSubmit}
    >
      {select && (
        <FormItem
          name={select.name}
          label={select.label}
          initialValue={selectedOption}
        >
          <Select
            options={select.options}
            onChange={handleSelectOptionChange}
          />
        </FormItem>  
      )}
      {textFields?.map(f => (
        <FormItem
          key={f.name + f.label + f.defaultValue + f.disabled + f.type}
          name={f.name}
          label={f.label}
          initialValue={f.defaultValue}
        >
          <Input
            placeholder={`Введите ${f.label.toLowerCase()}`}
            disabled={f.disabled}
          />
        </FormItem>
      ))}
    </Form>
  )
};