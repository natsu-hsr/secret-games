import type {ColumnType} from 'antd/es/table';

export type RawTaskInfo = {
  Stage_Name: string;
  Stage_Description_Long: string;
}
export type TaskInfo = {
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
  draggable: boolean;
  // для передачи координат при drag-действии в зависимую плитку
  HTML_ID: string | null; 
  // id других маркеров, связанных маршрутом. Приходит в виде строки, разделенной запятыми (не массив)
  Parent_Knot_ID?: string;
}
export type MapPlacemark = {
  id: string;
  name: string;
  coordinates: [number, number];
  labelType: string;
  draggable: boolean;
  // id связанной плитки на тетрисе (при наличии)
  tileId: string | null;
}

export type MapConnection = {
  fromId: string;
  toId: string;
}

/*
  Мапа для хранения всех маршрутов между точками.
  В силу ограничений системы, для каждого маркера на карте связь приходит только в одном направлении.
  (Из точки А в Б, но не из Б в А).
  То есть, если маркер 1 связан с 2, то в маркере 2 в поле Parent_Knot_ID не будет id маркера 1).
  Это поле и нужно для создания общего "реестра" путей между маркерами.
  Ключом будет id текущего маркера, значением - список связанных маркеров.
*/
export type MapRoutes = Map<string, Set<string>>;
// rtk не может хранить Map (она не сереализуемая), поэтому перед сохранением конвертируем в обычный объект
export type SerializableRoutes = Record<string, string[]>;

export type RawMapPlacemarks = RawMapPlacemark[];
export type MapPlacemarks = MapPlacemark[];
export type MapConnections = MapConnection[];

export type MapData = {
  placemarks: MapPlacemark[];
  connections: MapConnection[];
  routes?: SerializableRoutes;
}

// ======= chart =======
export type RawChartPoint = {
  Time_Value: number;
  Demand: string;
  Knot_ID: string;
  Knot_Name: string;
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
  /** ID плитки-приёмника. Если это поле есть, то плитка - транспорт */
  Card_Header_ID_To: string;
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
  /** ID транспорта */
  id: string;
  /** ID плитки-источника */
  fromId: string;
  /** ID плитки-приёмника */
  toId: string;
  /** Наследуется от родительской плитки, нужен для запроса формы  */
  apiName: string;
}

export type RawTilesDto = RawTileDto[];
export type TilesDto = TileDto[];

export type TilesDataDto = {
  tiles: TilesDto;
  connectors: TransportConnector[];
  options: {
    selectedTileId: string | undefined;
  };
};

// ======= form =======
export type Statistic = {
  label: string;
  value: string;
}

export type List = {
  subtitle: string;
  statistics: Statistic[]
}

export type FormInformationSection = {
  title: string;
  statistics?: Statistic[]
  lists?: List[];
  withForm?: boolean;
}

export type FormInformation = {
  title: string;
  description: string;
  sections: FormInformationSection[];
}

export type RawFieldType = 'text' | 'float' | 'number' | 'radio' | 'select' | 'coordinates';
export type FieldType = RawFieldType;

export type FormType = 'radio' | 'select' | 'proportions';

export type FieldControl = {
  value?: string;
  disabled: boolean;
}

export type FieldControls = Record<string, FieldControl>;

export type RawFormFieldDto = {
  HTML_ID: string;
  /** label для поля */ 
  HTML_Label: string;
  /** label для значения опции (// todo: скорей всего не используется, удалить) */ 
  HTML_Label_rus?: string
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
  optionLabels?: string[];
  controls?: FieldControls;
  // TODO: убрать как бэк положет selected в другое поле
  // специальное поле под селект для значения HTML_enable = 'selected'
  selected?: boolean;
  // label для опции
  optionLabel?: string;
  // массив зависимых полей: значение value интерпретируется в зависимости от типа поля
  dependentFields?: FieldDependentField[]
  parentId?: string;

}

// todo: удалить позже
// костыльное поле для отображения формы по секциям
export type SectionFormField = {
  label: string;
  value: string;
}

export type SectionFormList = {
  categoryName: string;
  fields: SectionFormField[];
}

// todo: удалить позже
// костыльное поле для отображения формы по секциям
export type SectionsFormConfig = {
  characteristics: SectionFormField[],
  costs: {
    variable: SectionFormField[],
    fixed: SectionFormField[],
  },
  formParams: FormFieldsDto;
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
  // todo: костыльное поле для группировки массива филдов по секциям
  sections?: SectionsFormConfig;
}

// ---------------------

export type TaskCommonData = Partial<{
  selectedPlacemarkId: string;
  tableRowName: string;
  tableRowId: string;
  tileId?: string;
  transportId?: string;
  tileApiName: string;
  tileName: string;
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

export type TileMarkerRoute = {
  toId: string;
  distance: number;
};

export type TileMarkerData = {
  coordinates: [number, number];
  routes: TileMarkerRoute[];
}

export type TilesMarkerData = Record<string, TileMarkerData>

export type TTask  = {
  groupId: number;
  id: number;
  info: TaskInfo;
  mapData: MapData;
  tableData: TableDataDto;
  tilesData: TilesDataDto;
  formData: TypedFormData;
  commonData: TaskCommonData | undefined;
  tilesMarkerData: TilesMarkerData | undefined;
}

export type TTaskSliceState = Partial<TTask>

