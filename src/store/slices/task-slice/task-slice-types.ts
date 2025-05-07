export type TTaskInfo = {
  title: string;
  description: string;
}

// ======= map =======
export type TCoordinates = [number, number];
export type TMapMarker = {
  coordinates: TCoordinates;
}
export type TTaskMapData = {
  center: TMapMarker;
  additional?: TMapMarker[];
}

// ======= chart =======
export type TChartData = {
  name: string;
  [key: string]: number | string;
};
export type TTaskChartData = TChartData[];

// ======= table =======

export type TTask  = {
  id: number;
  info: TTaskInfo;
  mapData: TTaskMapData;
  chartData: TTaskChartData;
}

export type TTaskSliceState = {
  task: TTask | undefined;
};
