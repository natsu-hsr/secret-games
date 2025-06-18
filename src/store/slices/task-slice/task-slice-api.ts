import axios from "axios";
import type {RawChartDataDto, RawFormFieldsDto, RawMapDataDto, RawTableDataDto, RawTilesDto} from "./task-slice-types";

// common
type UserInfo = {
  userId: string;
}

export type TaskInfo = {
  stageId: string;
  scriptId: string;
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

export type PostFormDataArgs = TaskInfo & UserInfo & {
  productId: string,
  cardHeaderId : string,
} & Record<string, unknown>;
export const postFormData = (data: PostFormDataArgs) => {
  const {
    userId,
    scriptId,
    stageId,
    productId,
    cardHeaderId,
    ...rest
  } = data;

  return axios.post<string>(
    '/save.php?save_id=tmp_result',
    {
      user_id: userId,
      script_id: scriptId,
      stage_id: stageId,
      product_id: productId,
      card_header_id: cardHeaderId,
      ...rest,
    },
    {
      headers: {"Content-Type": "multipart/form-data"},
    }
  )
}

export type PostTaskArgs = TaskInfo & UserInfo;
export const postTask= ({userId, scriptId, stageId}: PostTaskArgs) => {
  return axios.post<string>(
    '/save.php?save_id=main_result',
    {
      user_id: userId,
      script_id: scriptId,
      stage_id: stageId,
    },
    {
      headers: {"Content-Type": "multipart/form-data"},
    }
  )
}