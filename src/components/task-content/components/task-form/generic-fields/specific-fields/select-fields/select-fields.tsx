import {InputNumber} from 'antd';
import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import {useEffect, type FC} from 'react';

import {FieldNumberLikePrecision, FieldNumberLikeStep, NUMBERLIKE_FIELD_TYPES} from '@shared/constants';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {
  selectTaskCommonData,
  selectTilesMarkerData,
  taskSliceActions,
  type FormFieldDto,
  type FormFieldsDto,
} from '@store/slices/task-slice';

import {adaptFieldsToSelectForm} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

export const SelectFields: FC<GenericFieldsProps> = ({scrollContainerRef, form, fields}) => {
  const dispatch = useAppDispatch();
  const {select, selectedOption} = adaptFieldsToSelectForm({fields});

  const textFields = fields.filter(f => f.type !== 'select');

  const {tileId} = useAppSelector(selectTaskCommonData) ?? {};
  const tilesMarkerData = useAppSelector(selectTilesMarkerData);

  const watcher = Form.useWatch(select?.name, form);

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
  };

  useEffect(() => {
    if (!tileId) {
      return;
    }

    if (Object.values(coordinatesFields)?.length < 1) {
      return;
    }

    const [latitude, longitude] = tilesMarkerData?.[tileId]?.coordinates ?? [];

    if (latitude && longitude) {
      form.setFieldValue(coordinatesFields.latitude.name, latitude)
      form.setFieldValue(coordinatesFields.longitude.name, longitude)
    }

  }, [tilesMarkerData, tileId, coordinatesFields, form])

  useEffect(() => {
    const val = watcher;
    if (val !== undefined) {
      handleSelectOptionChange(val);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watcher]);

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
              <Input disabled={coordinatesFields.latitude.disabled} />
            </FormItem>
          )}
          {coordinatesFields.longitude && (
            <FormItem
              name={coordinatesFields.longitude.name}
              label={coordinatesFields.longitude.label}
              initialValue={coordinatesFields.longitude.defaultValue}
              style={{maxWidth: '80px'}}
            >
              <Input disabled={coordinatesFields.longitude.disabled} />
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
            disabled={select.disabled}
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
          {NUMBERLIKE_FIELD_TYPES.includes(f.type) ? (
            <InputNumber
              className='fw'
              placeholder={`Введите ${f.label.toLowerCase()}`}
              disabled={f.disabled}
              step={FieldNumberLikeStep[f.type]}
              precision={FieldNumberLikePrecision[f.type]}
            />
          ) : (
            <Input
              placeholder={`Введите ${f.label.toLowerCase()}`}
              disabled={f.disabled}
            />
          )}
        </FormItem>
      ))}
    </>
  )
};