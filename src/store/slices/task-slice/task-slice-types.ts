import type {ColumnType} from 'antd/es/table';

export type TTaskInfo = {
  title: string;
  description: string;
}

// ======= map =======
export type RawMapMarkerDto = {
  Knot_ID: string;
  Knot_Name: string;
  Knot_Latitude: string
  Knot_Longitude: string
  label_type: string;
  draggable: string;
}
export type MapMarkerDto = {
  id: string;
  name: string;
  coordinates: [number, number];
  labelType: string;
  draggable: boolean;
}

export type RawMapDataDto = RawMapMarkerDto[];
export type MapDataDto = MapMarkerDto[];

// ======= chart =======
export type RawChartDotDto = {
  Time_Value: number;
  Demand: string;
};
export type RawChartDataDto = RawChartDotDto[];

export type ChartDotDto = {
  name: string;
  [key: string]: number | string;
};
export type ChartDataDto = ChartDotDto[];

// ======= table =======
export type TableColumn = {
  key: string;
  dataIndex: ColumnType['dataIndex'];
  title: ColumnType['title'];
}
export type TableDataDto = {
  columns: TableColumn[];
  data: Record<string, string | number | boolean>[];
  options: {
    selectedRowId: string;
  }
}
export type RawTableDataDto = Record<string, string>[];

// ======= tiles =======
export type RawTileDto = {
  Card_Header_ID: string;
  Card_Header_Name: string;
  Card_Type_Name: string;
  Card_Type_Description: string;
  Card_Type_API_Name: string;
  Column_Start: number;
  Column_End: number;
  Row_Start: number;
  Row_End: number;
  Cell_Color: string;
}
export type TileDto = {
  id: string;
  name: string;
  typeName: string;
  apiName: string;
  typeDescription: string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
  color: string;
}

export type RawTilesDto = RawTileDto[];
export type TilesDto = TileDto[];

// ======= tiles =======
export type RawFieldType = 'text' | 'radio' | 'select';
export type FieldType = 'TEXT' | 'RADIO' | 'SELECT';

export type FieldControl = {
  value?: string;
  disabled: boolean;
}

export type FieldControls = Record<string, FieldControl>;

export type RawFormFieldDto = {
  HTML_ID: string;
  HTML_Label: string;
  HTML_type: RawFieldType;
  HTML_value: number | string;
  HTML_enable: '0' | '1';
} & Record<string, string>;
export type FormFieldDto = {
  name: string;
  label: string;
  type: FieldType;
  defaultValue: number | string | boolean;
  disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  optionLabel?: string[];
  controls?: FieldControls;
}
export type RawFormFieldsDto = RawFormFieldDto[];
export type FormFieldsDto = FormFieldDto[];
export type SortedFormFieldsDto = {
  select?: FormFieldDto;
  radios?: FormFieldDto[];
  regularFields: FormFieldDto[];
}

// ---------------------

export type TTask  = {
  groupId: number;
  id: number;
  info: TTaskInfo;
  mapData: MapDataDto;
  chartData: ChartDataDto;
  tableData: TableDataDto;
  tilesData: TilesDto;
  formConfig: SortedFormFieldsDto | undefined;
}

export type TTaskSliceState = Partial<TTask>

