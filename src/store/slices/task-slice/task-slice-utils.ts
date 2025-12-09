
import type {HeadersLike} from '@shared/types';

import type {
  ChartLines,
  ChartPoint,
  FormFieldDto,
  FormType,
  MapConnection,
  MapData,
  MapPlacemark,
  MapRoutes,
  RawChartPoints,
  RawFormFieldDto,
  RawMapPlacemark,
  RawTableDataDto,
  SectionsFormConfig,
  SerializableRoutes,
  TableDataDto,
} from './task-slice-types'

type ConvertRawTableDataArgs = {
  rawData: RawTableDataDto;
}
export const convertRawTableData = ({rawData}: ConvertRawTableDataArgs): TableDataDto | undefined => {
  if (!rawData?.length) return undefined;

  const configRawEntity = rawData?.shift();
  if (!configRawEntity) return undefined;

  const hiddenColumns: string[] = ['Product_ID']; // TODO: перенести на бэк

  const columns = Object.entries(configRawEntity)
    .filter(([k])=> isNaN(Number(k))) // TODO: убрать костыль как бэк уберет дублирование
    .filter(([k]) => !hiddenColumns.includes(k))
    .map(([k, v]) => ({
    key: k,
    dataIndex: k,
    title: v,
    align: 'center',
  }));

  const convertedData = rawData.map((rd, i) => ({
    id: rd?.Product_ID ?? i + 1,
    ...rd,
  }));

  return {
    columns,
    data: convertedData,
    options: {
      selectedRowId: convertedData?.[0]?.id ?? '',
    }
  }
}
type ConvertRawFieldArgs = {
  rawField: RawFormFieldDto;
}
export const convertRawField = ({rawField}: ConvertRawFieldArgs): FormFieldDto => {
  const convertedField: FormFieldDto = {
    name: rawField.HTML_ID,
    label: rawField.HTML_Label,
    type: rawField.HTML_type ?? 'text',
    defaultValue: rawField.HTML_value,
    disabled: !rawField.HTML_enable,
    selected: rawField.HTML_selected,
    parentId: rawField?.Parent_ID,
    dependentFields: [],
    optionLabel: rawField.HTML_Label_rus,
  }

  // ==== dependentFields ====
  if (convertedField.type === 'select') {
    // для типа select это состояние обычных полей при выборе конкретного опшена
    Object.entries(rawField)
      .forEach(([k, v]) => {
        if (!k.endsWith('_enable') || k.startsWith('HTML')) {
          return;
        }

        const key = k.split('_enable')?.[0];

        convertedField.dependentFields?.push(({
          name: key,
          disabled: !v,
        }))
      });
  }

  return convertedField;
};

type GetFormTypeArgs = {
  rawFields: RawFormFieldDto[];
}
export const getFormType = ({rawFields}: GetFormTypeArgs): FormType => {
  if (rawFields.some(f => f.HTML_type === 'radio')) return 'radio';
  if (rawFields.some(f => f.HTML_type === 'select')) return 'select';

  return 'proportions';
}

// todo: костыльный метод группировки полей по секциям, удалить позже
export const groupFormFields = ({rawFields}: GetFormTypeArgs): SectionsFormConfig => {
  const sectionsForm: SectionsFormConfig = {
    characteristics: [],
    costs: {
      variable: [],
      fixed: [],
    },
    formParams: [],
  };

  rawFields.forEach(rf => {
    switch (rf?.HTML_Label_rus) {
      case 'Характеристики склада': {
        sectionsForm.characteristics = [
          ...sectionsForm.characteristics,
          {label: rf.HTML_Label, value: String(rf.HTML_value)},
        ];
        break;
      }
      case 'Переменные затраты': {
        sectionsForm.costs.variable = [
          ...sectionsForm.costs.variable,
          {label: rf.HTML_Label, value: String(rf.HTML_value)},
        ];
        break;
      }
      case 'Постоянные затраты': {
        sectionsForm.costs.fixed = [
          ...sectionsForm.costs.fixed,
          {label: rf.HTML_Label, value: String(rf.HTML_value)},
        ];
        break;
      }
      default: {
        sectionsForm.formParams = [
          ...sectionsForm.formParams,
          convertRawField({rawField: rf}),
        ];
      }
    }
  });


  return sectionsForm;
}


type ConvertRawChartDataArgs = {
  data: RawChartPoints;
}
/**
 * Преобразует «сырые» данные по точкам графика в данные, готовые для отрисовки библиотекой recharts.
 * 
 * Грязные данные - массив объектов с данными по оси `y` для точки в `x` по каждой линии отдельно.
 * 
 * На выходе нужно отдавать объедененный объект по точке `x`, который содержит все значения `y` доступный линий
 * 
 * Функция объединяет все записи с одинаковым `Time_Value` (значение по оси `x`) в одну сущеность точки (`ChartPoint`), 
 * добавляя в неё поля со значениями для оси `y` для каждой линии (ключом для y служит id линии).
 * 
 * @param {ConvertRawChartDataArgs} args - аргументы функции
 * @param {RawChartPoints} args.data - массив сырых данных с точками графика по каждой линии
 * @returns {ChartLines} — объект с двумя полями:
 *   - `lineIds: string[]` — список всех уникальных идентификаторов линий.
 *   - `data: ChartPoint[]` — массив объединённых точек:
 *      каждая точка содержит свойство `name` (значение по X)
 *      и динамические свойства с ключами из `lineIds`, значениями Y.
 */
export const convertRawChartData = ({data}: ConvertRawChartDataArgs): ChartLines => {
  const lineIds = new Set<string>();
  const combinedChartPoints: Record<string, ChartPoint> = {};

  const TOTAL_ID = 'Total';

  const hasFewCharts = (() => {
    const s = new Set<string>();
    for (const {Knot_Name} of data) {
      s.add(String(Knot_Name));
      if (s.size >= 2) return true;   // ранний выход
    }
    return false;
  })();

  // добавляем суммирующую кривую
  if (hasFewCharts) {
    lineIds.add(TOTAL_ID);
  }

  data
    .filter(rf => rf.Knot_Name !== TOTAL_ID)
    .forEach(rf => {
      // id кривой
      const id = rf.Knot_Name;
      // значение по x
      const name = String(rf.Time_Value);
      // значение по y
      const yValue = +rf.Demand;

      lineIds.add(id);

      if (!combinedChartPoints?.[name]) {
        combinedChartPoints[name] = {
          name,
          [id]: yValue,
        } as ChartPoint;
      } else if (!combinedChartPoints[name]?.[id]) { // точка есть, но значения по графику с {id} в ней еще нет
        combinedChartPoints[name][id] = yValue;
      }

      // и добавляем к суммарной кривой, если есть хотя бы 2 кривых
      if (hasFewCharts) {
        const currentTotalValue = Number(combinedChartPoints[name][TOTAL_ID]);
        const prevValue = isNaN(currentTotalValue) ? 0 : currentTotalValue;

        combinedChartPoints[name][TOTAL_ID] = prevValue + yValue;
      }
    });

  return {
    lineIds: [...lineIds],
    data: Object.values(combinedChartPoints),
  };
};

// ================= КАРТА =================

// rtk не может хранить Map (она не сереализуемая), поэтому перед сохранением конвертируем в обычный объект
export const mapToSerializable = (map: Map<string, Set<string>>): SerializableRoutes => {
  const obj: SerializableRoutes = {};
  for (const [key, set] of map.entries()) {
    obj[key] = [...set];
  }
  return obj;
};


// утилитарный метод для convertRawMapData, который икапсулирует всю работу с мапой
const updateRoutes = (routes: MapRoutes, sourceId: string, dependentId: string) => {
  const currentConnections = routes.get(sourceId);

  if (!currentConnections) {
    routes.set(sourceId, new Set([dependentId]));
    return;
  }

  routes.set(sourceId, currentConnections.add(dependentId))
}

export const convertRawMapData = (rawMapData: RawMapPlacemark[]): MapData => {
  const connections: MapConnection[] = [];
  const routes: MapRoutes = new Map();

  const placemarks: MapPlacemark[] = rawMapData.map(rm => {

    // todo: удалить с переходом на routes
    if (rm?.Parent_Knot_ID) {
      rm.Parent_Knot_ID.split(',')
        .forEach(toId => connections.push({fromId: rm.Knot_ID, toId}));
    }

    //
    if (rm?.Parent_Knot_ID) {
      /*
        Cвязи - двунаправлененые, поэтому обрабатываем как все Parent_Knot_ID для текущего маркера,
        так и вносим для каждого из Parent_Knot_ID текущий маркер
      */ 
      const dependentRoutes = rm.Parent_Knot_ID.split(',');

      
      dependentRoutes.forEach(dependentId => {
        // вносим связи для текущего
        updateRoutes(routes, rm.Knot_ID, dependentId);

        // теперь для зависимых
        updateRoutes(routes, dependentId, rm.Knot_ID);
      });
    }

    return {
      id: rm.Knot_ID,
      name: rm.Knot_Name,
      coordinates: [+(rm.Knot_Latitude.replace(',', '.')), +rm.Knot_Longitude.replace(',', '.')],
      labelType: rm.label_type,
      draggable: rm.draggable,
      tileId: rm.HTML_ID,
    }
  });

  console.log('routes=', routes);

  return {
    placemarks,
    connections,
    routes: mapToSerializable(routes),
  }
}

// todo: вынести куда-нибудь в отдельное место
export const getFilenameFromHeaders = (headers: HeadersLike): string | null => {
  const cd = headers['content-disposition'];
  if (!cd) return null;

  const match = cd.toString().match(/filename="?([^"]+)"?/);
  return match ? match[1] : null;
};
