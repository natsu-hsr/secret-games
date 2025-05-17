import type {TableProps} from 'antd/es/table';

export type TTaskInfo = {
  title: string;
  description: string;
}

// ======= map =======
export type TCoordinates = [number, number];
export type TMapMarker = {
  id: number;
  coordinates: TCoordinates;
}
export type TTaskMapData = TMapMarker[];

// ======= chart =======
export type TChartData = {
  name: string;
  [key: string]: number | string;
};
export type TTaskChartData = TChartData[];

// ======= table =======
export type TTableData = {
  columns: TableProps['columns'];
  data: TableProps['dataSource'];
}

// ======= tiles =======
export type TTileData = {
  id: number;
  title: string;
  // массив координат "точек" плитки (предполагается, что они непрерывны)
  coordinates: [number, number][];
  // зависимые данные для других форм
  mapData: TMapMarker[];
  formConfig: TFormConfig;
}
export type TTilesData = TTileData[];

// ======= tiles =======
export type TFieldType = 'TEXT';

export type TFormField = {
  name: string;
  label: string;
  type: TFieldType;
}
export type TFormConfig = {
  title: string;
  fields: TFormField[];
}

// ---------------------

export type TTask  = {
  id: number;
  info: TTaskInfo;
  mapData: TTaskMapData;
  chartData: TTaskChartData;
  tableData: TTableData;
  tilesData: TTilesData;
  formConfig: TFormConfig | undefined;
}

export type TTaskSliceState = {
  task: TTask | undefined;
};
