import type {Option as DefaultOption} from '@shared/types'
import type {FieldDependentField} from '@store/slices/task-slice';

export type SelectControl = {
  value?: string;
  disabled: boolean;
}

export type Option = DefaultOption & {
  controls: FieldDependentField[];
};

export type Select = {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
}