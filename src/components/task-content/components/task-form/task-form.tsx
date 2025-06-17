import Form, {useForm} from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import FormItem from 'antd/es/form/FormItem';
import {Button, Select} from 'antd';
import {useMemo} from 'react';

import {Loadable} from '@components/loadable';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {
  loadFormDataByTileParams,
  selectFormConfigData,
  taskSliceActions,
  type SortedFormFieldsDto,
} from '@store/slices/task-slice';
import {renderRadiosFields} from './task-form-utils';

import styles from './task-form.module.scss';
interface FormComponentProps {
  fields: SortedFormFieldsDto | undefined
}
const FormComponent = ({fields}: FormComponentProps) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedControls = select?.options?.find((o: any) => o.value === value)?.controls;

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

  return (
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
  )
}

export const TaskForm = () => {
  const fields = useAppSelector(selectFormConfigData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadFormDataByTileParams.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadFormDataByTileParams.typePrefix));

  const {
    select,
    radios,
    regularFields,
  } = fields ?? {};
  
  const hasActiveFields = useMemo(
    () => !!(radios?.length || regularFields?.length || select?.name),
    [regularFields, radios, select],
  );

  return (
    <Loadable
      emptyProps={{
        isEmpty: !hasActiveFields,
        emptyMessage: 'Поля не заданы',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <FormComponent fields={fields} />;
    </Loadable>
  )
}
