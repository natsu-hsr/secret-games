import {
  fetchChartDataByRowId,
  fetchInfo,
  type FetchDataByRowIdArgs,
  type FetchInfoArgs,
} from './task-slice-api';
import type {ChartLines, TaskInfo} from './task-slice-types';
import {convertRawChartData} from './task-slice-utils';

export const loadInfo = async (args: FetchInfoArgs): Promise<TaskInfo> => {
  const response = await fetchInfo(args);
  const {data} = response;

  return {
    title: data?.[0]?.Stage_Name,
    description: data?.[0]?.Stage_Description_Long,
  }
}

export const loadChartDataByRowId = async (args: FetchDataByRowIdArgs): Promise<ChartLines> => {
  const response = await fetchChartDataByRowId(args);
  const {data} = response;
  return convertRawChartData({data});
};

