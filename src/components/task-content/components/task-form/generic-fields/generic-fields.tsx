import type {FormInstance} from 'antd/lib/form';
import type {FC, RefObject} from 'react';

import type {FormFieldsDto, FormType} from '@store/slices/task-slice';

import {ProportionsFields} from './specific-fields/proportions-fields';
// import {RadioFields} from './specific-fields/radio-fields';
import {RadioTableFields} from './specific-fields/radio-table-fields';
import {SelectFields} from './specific-fields/select-fields';

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
  // radio: RadioFields,
  radio: RadioTableFields,
  proportions: ProportionsFields,
};