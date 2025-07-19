import type {FormInstance} from 'antd/lib/form';
import type {FC, RefObject} from 'react';

import type {FormFieldsDto, FormType} from '@store/slices/task-slice';

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
}

export const GenericFields: Record<FormType, FC<GenericFieldsProps> | null> = {
  select: SelectFields,
  radio: RadioFields,
  default: null,
};