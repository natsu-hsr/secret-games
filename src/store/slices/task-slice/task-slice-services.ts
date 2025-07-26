import {
  fetchChartDataByRowId,
  type FetchDataByRowIdArgs,
} from './task-slice-api';
import type {ChartLines} from './task-slice-types';
import {convertRawChartData} from './task-slice-utils';

export const loadChartDataByRowId = async (args: FetchDataByRowIdArgs): Promise<ChartLines> => {
  const response = await fetchChartDataByRowId(args);
  const {data} = response;
  return convertRawChartData({data});
};

