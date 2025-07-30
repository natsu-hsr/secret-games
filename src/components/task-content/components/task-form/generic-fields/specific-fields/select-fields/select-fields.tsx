import Flex from 'antd/es/flex';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import {useEffect, type FC} from 'react';

import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {
  selectTaskCommonData,
  selectTilesMarkerCoordinates,
  taskSliceActions,
  type FormFieldDto,
  type FormFieldsDto,
} from '@store/slices/task-slice';

import {adaptFieldsToSelectForm} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

export const SelectFields: FC<GenericFieldsProps> = ({scrollContainerRef, form, fields}) => {
  const dispatch = useAppDispatch();
  const {select, selectedOption} = adaptFieldsToSelectForm({fields});

  const textFields = fields.filter(f => f.type === 'text');

  const {tileId} = useAppSelector(selectTaskCommonData) ?? {};
  const tilesMarkerCoordinates = useAppSelector(selectTilesMarkerCoordinates);

  const coordinatesFields = fields
    .filter(f => f.type === 'coordinates')
    .reduce((acc, cur) => {
      if (cur.name.endsWith('latitude')) {
        acc.latitude = cur;
        return acc;
      }

      if (cur.name.endsWith('longitude')) {
        acc.longitude = cur;
        return acc;
      }

      return acc;
    }, {} as Record<'latitude' | 'longitude', FormFieldDto>);

  useEffect(() => {
    if (!tileId) {
      return;
    }

    if (Object.values(coordinatesFields)?.length < 1) {
      return;
    }

    const [latitude, longitude] = tilesMarkerCoordinates?.[tileId] ?? [];

    if (latitude && longitude) {
      form.setFieldValue(coordinatesFields.latitude.name, latitude)
      form.setFieldValue(coordinatesFields.longitude.name, longitude)
    }

  }, [tilesMarkerCoordinates, tileId, coordinatesFields, form])

  const handleSelectOptionChange = (value: string) => {
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
      {Object.values(coordinatesFields)?.length > 0 && (
        <Flex gap={16}>
          {coordinatesFields.latitude && (
            <FormItem
              name={coordinatesFields.latitude.name}
              label={coordinatesFields.latitude.label}
              initialValue={coordinatesFields.latitude.defaultValue}
              style={{maxWidth: '80px'}}
            >
              <Input
                disabled={coordinatesFields.latitude.disabled}
              />
            </FormItem>
          )}
          {coordinatesFields.longitude && (
            <FormItem
              name={coordinatesFields.longitude.name}
              label={coordinatesFields.longitude.label}
              initialValue={coordinatesFields.longitude.defaultValue}
              style={{maxWidth: '80px'}}
            >
              <Input
                disabled={coordinatesFields.longitude.disabled}
              />
            </FormItem>
          )}
        </Flex>
      )}
      {select && (
        <FormItem
          name={select.name}
          label={select.label}
          initialValue={selectedOption}
        >
          <Select
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