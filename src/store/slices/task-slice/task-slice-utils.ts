import type {
  ChartLines,
  ChartPoint,
  FieldControls,
  FormFieldDto,
  FormFieldsDto,
  FormType,
  RawChartPoints,
  RawFormFieldDto,
  RawFormFieldsDto,
  RawTableDataDto,
  SortedFormFieldsDto,
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
    disabled: rawField.HTML_enable !== '1',
    selected: rawField.HTML_enable === 'selected',
    dependentFields: [],
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
          disabled: v === 'readonly',
        }))
      });
  }

  return convertedField;
};

type ConvertRawFormFieldsArgs = {
  rawFormFields: RawFormFieldsDto;
}
export const convertRawFormFields = ({rawFormFields}: ConvertRawFormFieldsArgs): SortedFormFieldsDto => {
  const regularConverted: FormFieldsDto = [];

  let select: FormFieldDto | undefined;
  let selectedSelect: string | undefined;

  const radiosConverted: FormFieldsDto = rawFormFields
    .filter(rf => rf.HTML_type === 'radio')
    .map(ff => convertRawField({rawField: ff}));

  // обработка select
  rawFormFields.forEach(rf => {
    if (rf.HTML_type === 'select') {
      if (rf.HTML_enable === 'selected') {
        selectedSelect = String(rf.HTML_value); // TODO: 
      }
      if (!select) {
        select = {
          name: rf.HTML_ID,
          label: rf.HTML_Label,
          type: rf.HTML_type ?? 'text',
          defaultValue: rf.HTML_value,
          disabled: rf.HTML_enable !== '1',
          options: [],
          controls: {},
        };
      }

      const controls: FieldControls = {};

      Object.entries(rf)
        .forEach(([k, v]) => {
          if (!k.endsWith('_enable') || k.startsWith('HTML')) {
            return;
          }

          const key = k.split('_enable')?.[0];

          controls[key] = {
            disabled: v === 'readonly',
            value: v === 'readonly' ? '' : undefined,
          }
        });

      const option = {
        label: rf.HTML_value,
        value: rf.HTML_value,
        controls: controls,
      };

      select.options.push(option);

      return;
    }


    if (radiosConverted.length === 0) {
      regularConverted.push(convertRawField({rawField: rf}));
    } else {
      const prefix = rf.HTML_ID.split('_')[0];

      const parentRadio = radiosConverted.find(pf => pf.name.startsWith(prefix));

      if (parentRadio) {
        const option = {
          name: rf.HTML_ID,
          value: rf.HTML_value,
          label: rf.HTML_Label,
        };

        const optionStr = rf.HTML_Label + ': ' + rf.HTML_value;

        if (parentRadio.options?.length) {
          parentRadio.options.push(option)
        } else {
          parentRadio.options = [option];
        }

        if (parentRadio.optionLabel?.length) {
          parentRadio.optionLabel.push(optionStr)
        } else {
          parentRadio.optionLabel = [optionStr];
        }
      } else {
        regularConverted.push(convertRawField({rawField: rf}));
      }
    }
  })

  return {
    select,
    selectedSelect,
    radios: radiosConverted,
    regularFields: regularConverted,
  };
};

type GetFormTypeArgs = {
  rawFields: RawFormFieldDto[];
}
export const getFormType = ({rawFields}: GetFormTypeArgs): FormType => {
  if (rawFields.some(f => f.HTML_type === 'radio')) return 'radio';
  if (rawFields.some(f => f.HTML_type === 'select')) return 'select';

  return 'default';
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

  data.forEach(rf => {
    // id кривой
    const id = rf.Knot_ID;
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
  });

  return {
    lineIds: [...lineIds],
    data: Object.values(combinedChartPoints),
  };
};
