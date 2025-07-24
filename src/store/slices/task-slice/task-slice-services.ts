import {
  fetchChartDataByRowId,
  fetchFormDataByTileParams,
  type FetchDataByRowIdArgs,
  type FetchFormDataByTileParamsArgs,
} from './task-slice-api';
import type {ChartLines, TypedFormData} from './task-slice-types';
import {convertRawChartData, convertRawField, getFormType} from './task-slice-utils';

export const loadFormDataByTileParams = async (args: FetchFormDataByTileParamsArgs): Promise<TypedFormData> => {
  const response = await fetchFormDataByTileParams(args);
  const {data} = response;
  return {
    type: getFormType({rawFields: data}),
    fields: data?.map(raw => convertRawField({rawField: raw})),
  };
}

export const loadChartDataByRowId = async (args: FetchDataByRowIdArgs): Promise<ChartLines> => {
  const response = await fetchChartDataByRowId(args);
  const {data} = response;
  return convertRawChartData({data});
};

