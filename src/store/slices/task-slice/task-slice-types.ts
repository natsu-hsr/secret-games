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
  coordinates: TMapMarker[];
}
export type TTilesData = TTileData[];

// ---------------------

export type TTask  = {
  id: number;
  info: TTaskInfo;
  mapData: TTaskMapData;
  chartData: TTaskChartData;
  tilesData: TTilesData;
  tableData: TTableData;
}

export type TTaskSliceState = {
  task: TTask | undefined;
};
