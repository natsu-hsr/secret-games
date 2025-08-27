export type RadioGroup = {
  checked?: boolean;
  name: string;
  labels: string[];
  value: string;
  disabled: boolean;
}

export type RadioGroups = RadioGroup[]