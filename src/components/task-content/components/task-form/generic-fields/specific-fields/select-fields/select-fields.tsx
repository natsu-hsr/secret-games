import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import {useState, type FC} from 'react';

import {taskSliceActions, type FormFieldsDto} from '@store/slices/task-slice';

import {adaptFieldsToSelectForm} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';
import {useAppDispatch} from '@store/config/hooks';

export const SelectFields: FC<GenericFieldsProps> = ({scrollContainerRef, fields}) => {
  const dispatch = useAppDispatch();
  const {select, selectedOption} = adaptFieldsToSelectForm({fields});

  // const [selectValue, setSelectValue] = useState<string | undefined>(selectedOption)

  const textFields = fields.filter(f => f.type === 'text');

  const handleSelectOptionChange = (value: string) => {
    // setSelectValue(value);

    const selectedOptionControls = select?.options?.find(o => o.value === value)?.controls;
  
    if (!selectedOptionControls) {
      console.error(`selectedOptionControls соответствующих значению ${value} не найдено`);
      return;
    }
  
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

    dispatch(taskSliceActions.updateFormFields(updatedFields));
  }

  return (
    <>
      {select && (
        <FormItem
          name={select.name}
          label={select.label}
          // initialValue={selectValue}
          initialValue={selectedOption}
          shouldUpdate
        >
          <Select
            // value={selectValue}
            options={select.options}
            onChange={handleSelectOptionChange}
            getPopupContainer={() => scrollContainerRef?.current ?? document.body}
          />
        </FormItem>  
      )}
      {textFields?.map(f => (
        <FormItem
          key={f.name + f.label + f.defaultValue + f.disabled + f.type}
          name={f.name}
          label={f.label}
          initialValue={f.defaultValue}
          shouldUpdate
        >
          <Input
            placeholder={`Введите ${f.label.toLowerCase()}`}
            disabled={f.disabled}
          />
        </FormItem>
      ))}
    </>
  )
};