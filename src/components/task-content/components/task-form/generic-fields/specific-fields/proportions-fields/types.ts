import type {FormFieldDto} from '@store/slices/task-slice';

export type ProportionFormField = FormFieldDto & {
  preLabel?: {
    label: string;
    value: string;
  }
}