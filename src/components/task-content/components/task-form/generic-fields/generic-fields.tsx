import type {FormInstance} from 'antd/lib/form';
import type {Dispatch, FC, RefObject, SetStateAction} from 'react';

import type {FormFieldsDto, FormType} from '@store/slices/task-slice';

import {ProportionsFields} from './specific-fields/proportions-fields';
import {RadioFields} from './specific-fields/radio-fields';
import {SelectFields} from './specific-fields/select-fields';

type GenericFieldsClassNames = Partial<{
  wrapperClassName: string;
}>

export type GenericFieldsProps = {
  form: FormInstance;
  fields: FormFieldsDto;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
  classNames?: GenericFieldsClassNames;
  setValid?: Dispatch<SetStateAction<boolean>>;
}

export const GenericFields: Record<FormType, FC<GenericFieldsProps>> = {
  select: SelectFields,
  radio: RadioFields,
  proportions: ProportionsFields,
};