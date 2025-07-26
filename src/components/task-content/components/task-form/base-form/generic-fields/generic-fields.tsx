import type {FormInstance} from 'antd/lib/form';
import type {FC, RefObject} from 'react';

import type {FormFieldsDto, FormType} from '@store/slices/task-slice';

import {RadioFields} from './specific-fields/radio-fields';
import {SelectFields} from './specific-fields/select-fields';
import {ProportionsFields} from './specific-fields/proportions-fields';

type GenericFieldsClassNames = Partial<{
  wrapperClassName: string;
}>

export type GenericFieldsProps = {
  form: FormInstance;
  fields: FormFieldsDto;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
  classNames?: GenericFieldsClassNames;
}

export const GenericFields: Record<FormType, FC<GenericFieldsProps>> = {
  select: SelectFields,
  radio: RadioFields,
  proportions: ProportionsFields,
};