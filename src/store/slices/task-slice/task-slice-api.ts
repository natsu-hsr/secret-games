import axios from "axios";
import {mockTasks} from "./_mock-data";
import type {RawChartDataDto, RawFormFieldsDto, RawMapDataDto, RawTableDataDto, RawTilesDto, TTask} from "./task-slice-types";

// common
export type TaskInfo = {
  stageId: string;
  scriptId: string;
}

export interface FetchTaskArgs {
  groupId: number;
  id: number;
}
export const fetchTask = ({groupId, id}: FetchTaskArgs): Promise<{data: TTask}> => {
  return new Promise((resolve, reject) => {
    const findedTask = mockTasks.find(t => t.id === id && t.groupId === groupId);

    if (findedTask !== undefined) {
      resolve({data: findedTask});
    } else {
      reject(`Задание с id ${id} и groupId ${groupId} не найдено`);
    }
  });
}

// export const fetchTaskData = ({scriptId, stageId}: TaskInfo): Promise<{data: TTask}> => {
//   return Promise.all([
    
//   ]);
// }

export type FetchTableDataArgs = TaskInfo;
export const fetchTableData = ({scriptId, stageId}: FetchTableDataArgs) => {
  return axios.get<RawTableDataDto>(
    '/api.php',
    {
      params: {
        api_id: 'product_list',
        script_id: scriptId,
        stage_id: stageId,
      }
    }
  );
  //   columns: [
  //     {
  //       title: 'Наименование',
  //       dataIndex: 'name',
  //       key: 'name',
  //     },
  //     {
  //       title: 'Количество шт.',
  //       dataIndex: 'count',
  //       key: 'count',
  //     },
  //     {
  //       title: 'Производитель',
  //       dataIndex: 'manufacturer',
  //       key: 'manufacturer',
  //     },
  //     {
  //       title: 'Стоимость шт.',
  //       dataIndex: 'cost',
  //       key: 'cost',
  //     },
  //   ],
  //   data: [
  //     {
  //       key: '1',
  //       id: '1',
  //       name: 'Продукт 1',
  //       count: 1048,
  //       manufacturer: 'Япония',
  //       cost: 0.97,
  //     },
  //     {
  //       key: '2',
  //       id: '2',
  //       name: 'Продукт 2',
  //       count: 554,
  //       manufacturer: 'США',
  //       cost: 1.25,
  //     },
  //     {
  //       key: '3',
  //       id: '3',
  //       name: 'Продукт 3',
  //       count: 703,
  //       manufacturer: 'Китай',
  //       cost: 0.67,
  //     },
  //     {
  //        key: '4',
  //       id: '4',
  //       name: 'Продукт4',
  //       count: 898,
  //       manufacturer: 'Россия',
  //       cost: 1.1,
  //     },
  //   ]
  // });
}

export type FetchDataByRowIdArgs = TaskInfo & {
  rowId: string;
};

export const fetchTilesDataByRowId = ({stageId, scriptId, rowId}: FetchDataByRowIdArgs) => {
  return axios.get<RawTilesDto>(
    '/api.php',
    {
      params: {
        api_id: 'stage_tetris',
        script_id: scriptId,
        stage_id: stageId,
        product_id: rowId,
      },
    }
  )
}

export const fetchChartDataByRowId = ({stageId, scriptId, rowId}: FetchDataByRowIdArgs) => {
  return axios.get<RawChartDataDto>(
    '/api.php',
    {
      params: {
        api_id: 'stage_product_demand',
        script_id: scriptId,
        stage_id: stageId,
        product_id: rowId,
      },
    }
  )
}

// tiles and dependent blocks
type TileParams = {
  tileId: string;
  name: string;
  apiName: string;
}

export type FetchMapDataByTileIdArgs = TaskInfo & Pick<TileParams, 'tileId'>;
export const fetchMapDataByTileId = ({stageId, scriptId, tileId}: FetchMapDataByTileIdArgs) => {
  return axios.get<RawMapDataDto>(
    '/api.php',
    {
      params: {
        api_id: 'stage_ya_map',
        script_id: scriptId,
        stage_id: stageId,
        tileId: tileId,
      },
    }
  )
}

export type FetchFormDataByTileParamsArgs = TaskInfo & TileParams & FetchDataByRowIdArgs;
export const fetchFormDataByTileParams = ({stageId, scriptId, apiName, tileId, rowId}: FetchFormDataByTileParamsArgs) => {
  return axios.get<RawFormFieldsDto>(
    '/api.php',
    {
      params: {
        api_id: apiName,
        script_id: scriptId,
        stage_id: stageId,
        product_id: rowId,
        card_header_id: tileId,
      },
    }
  )
}