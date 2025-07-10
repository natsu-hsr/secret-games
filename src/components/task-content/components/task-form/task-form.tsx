import {Button, Select, notification} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input/Input';
import type {AxiosError} from 'axios';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';

import {Loadable} from '@components/loadable';
import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {
  loadFormDataByTileParams,
  selectFormConfigData,
  taskSliceActions,
  type SortedFormFieldsDto,
  submitFormData,
  selectTableSelectedRowId,
  selectSelectedTileId,
} from '@store/slices/task-slice';

import {renderRadiosFields} from './task-form-utils';
import styles from './task-form.module.scss';

interface FormComponentProps {
  fields: SortedFormFieldsDto | undefined
}
const FormComponent = ({fields}: FormComponentProps) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const {userId} = useUserId();
  const {scriptId, stageId} = useParams();
  const productId = useAppSelector(selectTableSelectedRowId);
  const cardHeaderId = useAppSelector(selectSelectedTileId);

  const {
    select,
    radios,
    regularFields,
  } = fields ?? {};

  const handleFormSubmit = (values: Record<string, unknown>) => {
    const globalParams = {
      userId: userId ?? '',
      scriptId: scriptId ?? '',
      stageId: stageId ?? '',
      productId: productId ?? '',
      cardHeaderId: cardHeaderId ?? '',
    }

    const valuesToSubmit = {
      ...globalParams,
      ...values,
    };

    dispatch(submitFormData(valuesToSubmit))
      .unwrap()
      .then(data => {
        console.log('submit form then data=', data);
        notification.success({message: 'Данные успешно сохранены'});
      })
      .catch((e: AxiosError) => {
        const errorMessage = e?.response?.data;
        console.error('Ошибка при сохранении данных=', errorMessage);
        notification.error({message: `При сохранении данных произошла ошибка${errorMessage ? ` :${errorMessage}` : ''}`});
      });
  }

  const handleSelectOptionChange = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedControls = select?.options?.find((o: any) => o.value === value)?.controls;

    if (!selectedControls) {
      console.error(`selectedControls соответствующие значению ${value} не найдено`);
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
      <FormComponent fields={fields} />
    </Loadable>
  )
}
