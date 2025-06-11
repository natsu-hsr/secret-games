import Form, {useForm} from 'antd/es/form/Form';
import {Button, Empty, Select} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import cn from 'classnames';
import {useMemo} from 'react';

import {LayoutSpin} from '../layout-spin/layout-spin';
import {selectIsThunkPending} from '../../../../store/slices/loading-state-slice';
import {useAppDispatch, useAppSelector} from '../../../../store/config/hooks';
import {loadFormDataByTileParams, selectFormConfigData, taskSliceActions} from '../../../../store/slices/task-slice';
import {renderRadiosFields} from './task-form-utils';

import styles from './task-form.module.scss';
import Input from 'antd/es/input/Input';

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const fields = useAppSelector(selectFormConfigData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadFormDataByTileParams.typePrefix));

  const {
    select,
    radios,
    regularFields,
  } = fields ?? {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (values: any) => {
    console.log('values=', values)
  }

  const handleSelectOptionChange = (value: string) => {
    console.log('selected value=', value);
    console.log('select?.options=', select?.options);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedControls = select?.options?.find((o: any) => {
      return o.value === value
    })?.controls;
      console.log('selectedControls=', selectedControls);

    if (!selectedControls) {
      console.error(`selectedControls соответствующие значнию ${value} не найдено`);
      return;
    }

    const updatedFields = regularFields?.map(rf => {
      const matchedControlsKey = Object.keys(selectedControls).find(k => rf.name.endsWith(k));
      if (!matchedControlsKey) return rf;

      const matchedControls = selectedControls[matchedControlsKey];
      return ({
        ...rf,
        disabled: matchedControls?.disabled,
        defaultValue: matchedControls?.disabled ? '' : rf.defaultValue,
      })
    });

    if (updatedFields?.length) {
      dispatch(taskSliceActions.setRegularFormFields(updatedFields));
    }
  }
  
  const hasActiveFields = useMemo(
    () => radios?.length || regularFields?.length || select?.name,
    [regularFields, radios, select],
  );

  return (
    <LayoutSpin spinning={isLoading} tip='Загрузка...'>
      {
        hasActiveFields ? (
          <div className={styles.container}>
            <Form
              className={styles.form}
              form={form}
              layout='vertical'
              onFinish={handleFormSubmit}
            >
              <>
                {select && (
                  <FormItem
                    name={select.name}
                    label={select.label}
                  >
                    <Select
                      // defaultValue={select?.options?.[0]?.value}
                      options={select.options}
                      onChange={handleSelectOptionChange}
                    />
                  </FormItem>  
                )}
                {!!radios?.length && renderRadiosFields({radios})}
                {regularFields?.map(f => (
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
              </>
            </Form>
            <div className={styles['submit-btn-container']}>
              <Button
                className={styles['submit-btn']}
                type='primary'
                onClick={() => form.submit()}
              >
                Сохранить данные
              </Button>
            </div>
          </div>
        ) : (
          <Empty
            className={cn('fh', 'flex-col-center')}
            description='Поля не заданы'
          />
        )
      }
    </LayoutSpin>
  )
}
