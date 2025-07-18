import type {FormInstance} from 'antd/lib/form';
import type {FC} from 'react';

import type {FormFieldsDto, FormType} from '@store/slices/task-slice';

import {RadioForm} from './specific-forms/radio-form';
import {SelectForm} from './specific-forms/select-form';

type GenericFormClassNames = Partial<{
  wrapperClassName: string;
}>

export type GenericFormProps = {
  form: FormInstance;
  fields: FormFieldsDto;
  classNames?: GenericFormClassNames;
}

export const GenericForm: Record<FormType, FC<GenericFormProps> | null> = {
  select: SelectForm,
  radio: RadioForm,
  default: null,
};