export type RadioGroup = {
  checked?: boolean;
  name: string;
  // label: string;
  labels: string[];
  value: string;
}

export type RadioGroups = RadioGroup[]