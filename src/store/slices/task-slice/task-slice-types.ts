import type {ColumnType} from 'antd/es/table';

export type TTaskInfo = {
  title: string;
  description: string;
}

// ======= map =======
export type RawMapPlacemark = {
  Knot_ID: string;
  Knot_Name: string;
  Knot_Latitude: string
  Knot_Longitude: string
  label_type: string;
  draggable: string;
  /** для передачи координат при drag-действии в зависимую плитку */
  HTML_ID: string | null; 
  /** id другого маркера, до которого от текущего должен прокладываться маршрут. Преобразуется в MapConnection в utils */
  Parent_Knot_ID?: string;
}
export type MapPlacemark = {
  id: string;
  name: string;
  coordinates: [number, number];
  labelType: string;
  draggable: boolean;
  /** для передачи координат при drag-действии в зависимую плитку */
  tileId: string | null;
}

export type MapConnection = {
  fromId: string;
  toId: string;
}

export type RawMapPlacemarks = RawMapPlacemark[];
export type MapPlacemarks = MapPlacemark[];
export type MapConnections = MapConnection[];

export type MapData = {
  placemarks: MapPlacemark[];
  connections: MapConnection[];
}

// ======= chart =======
export type RawChartPoint = {
  Time_Value: number;
  Demand: string;
  Knot_ID: string;
};
export type RawChartPoints = RawChartPoint[];

export type ChartPoint = {
  name: string;
  [key: string]: number | string;
};
export type ChartPoints = ChartPoint[];

export type ChartLines = {
  lineIds: string[];
  data: ChartPoints;
};

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
  Card_Color: string;
  is_active: boolean;
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
  disabled: boolean;
}

/**
 * Описывает связь между двумя карточками.
 */
export interface TransportConnector {
  /** ID карточки-источника */
  from: string;
  /** ID карточки-приёмника */
  to: string;
}

export type RawTilesDto = RawTileDto[];
export type TilesDto = TileDto[];

export type TilesDataDto = {
  tiles: TilesDto;
  options: {
    selectedTileId: string | undefined;
  };
};

// ======= form =======
export type RawFieldType = 'text' | 'radio' | 'select' | 'coordinates';
export type FieldType = RawFieldType;

export type FormType = 'radio' | 'select' | 'proportions';

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
  HTML_enable: boolean;
  HTML_selected: boolean;
  /** техническое поле для группировки полей */ 
  Parent_ID: string; 
} & Record<string, string>;

export type FieldDependentField = {
  name: string,
  disabled?: boolean
};

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
  // TODO: убрать как бэк положет selected в другое поле
  /** специальное поле под селект для значения HTML_enable = 'selected' */
  selected?: boolean;
  /** массив зависимых полей: значение value интерпретируется в зависимости от типа поля */
  dependentFields?: FieldDependentField[]
  parentId?: string;
}

export type RawFormFieldsDto = RawFormFieldDto[];
export type FormFieldsDto = FormFieldDto[];

export type SortedFormFieldsDto = {
  select?: FormFieldDto;
  selectedSelect?: string;
  radios?: FormFieldDto[];
  regularFields: FormFieldDto[];
}

export type TypedRawFormFields = {
  type: FormType;
  rawFields: RawFormFieldsDto;
}

export type TypedFormData = {
  type: FormType;
  fields: FormFieldsDto;
}

// ---------------------

export type TaskCommonData = Partial<{
  selectedPlacemarkId: string;
  tableRowId: string;
  tileId: string;
  tileApiName: string;
}>;

/**
 * Описывает связь между координатами маркера на карте и связанной карточки (tile)
 */
// export type TileMarkerCoordinates = {
//   /** ID карточки-источника */
//   tileId: string;
//   /** ID карточки-приёмника */
//   coordinates: ;
// }

/**
 * Описывает связь между координатами маркера на карте и связанной карточки (tile)
 */
export type TilesMarkerCoordinates = Record<string, [number, number]>

export type TTask  = {
  groupId: number;
  id: number;
  info: TTaskInfo;
  mapData: MapData;
  tableData: TableDataDto;
  tilesData: TilesDataDto;
  formData: TypedFormData;
  commonData: TaskCommonData | undefined;
  tilesMarkerCoordinates: TilesMarkerCoordinates | undefined;
}

export type TTaskSliceState = Partial<TTask>

