import axios from 'axios';

import {API_PREFIX, FETCH_API_PATH, POST_API_PATH} from './task-slice-constants';
import type {
  RawChartPoints,
  RawFormFieldsDto,
  RawMapDataDto,
  RawTableDataDto,
  RawTilesDto,
} from './task-slice-types';

// common
type UserInfoArgs = {
  userId: string;
}

export type TaskInfoArgs = {
  stageId: string;
  scriptId: string;
}

export type FetchDataByRowIdArgs = TaskInfoArgs & UserInfoArgs & {
  rowId: string;
};

// export const fetchTaskData = ({scriptId, stageId}: TaskInfo): Promise<{data: TTask}> => {
//   return Promise.all([
    
//   ]);
// }

export type FetchTableDataArgs = TaskInfoArgs & UserInfoArgs;
export const fetchTableData = ({scriptId, stageId, userId}: FetchTableDataArgs) => {
  return axios.get<RawTableDataDto>(
    API_PREFIX.fetch,
    {
      params: {
        user_id: userId,
        api_id: FETCH_API_PATH.table,
        script_id: scriptId,
        stage_id: stageId,
      }
    }
  );
}

export const fetchTilesDataByRowId = ({stageId, scriptId, rowId, userId}: FetchDataByRowIdArgs) => {
  return axios.get<RawTilesDto>(
    API_PREFIX.fetch,
    {
      params: {
        user_id: userId,
        api_id: FETCH_API_PATH.tiles,
        script_id: scriptId,
        stage_id: stageId,
        product_id: rowId,
      },
    }
  )
}

export const fetchChartDataByRowId = ({stageId, scriptId, rowId, userId}: FetchDataByRowIdArgs) => {
  return axios.get<RawChartPoints>(
    API_PREFIX.fetch,
    {
      params: {
        user_id: userId,
        api_id: FETCH_API_PATH.chart,
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
  apiName: string;
}

export type FetchMapDataByTileIdArgs = TaskInfoArgs & UserInfoArgs & Pick<TileParams, 'tileId'>;
export const fetchMapDataByTileId = ({stageId, scriptId, tileId, userId}: FetchMapDataByTileIdArgs) => {
  return axios.get<RawMapDataDto>(
    API_PREFIX.fetch,
    {
      params: {
        user_id: userId,
        api_id: FETCH_API_PATH.map,
        script_id: scriptId,
        stage_id: stageId,
        tileId: tileId,
      },
    }
  )
}

export type FetchFormDataByTileParamsArgs = TaskInfoArgs & TileParams & FetchDataByRowIdArgs;
export const fetchFormDataByTileParams = ({
  stageId, scriptId, apiName, tileId, rowId, userId,
}: FetchFormDataByTileParamsArgs) => {
  return axios.get<RawFormFieldsDto>(
    API_PREFIX.fetch,
    {
      params: {
        user_id: userId,
        api_id: apiName,
        script_id: scriptId,
        stage_id: stageId,
        product_id: rowId,
        card_header_id: tileId,
      },
    }
  )
}

export type PostFormDataArgs = TaskInfoArgs & UserInfoArgs & {
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
    API_PREFIX.post,
    {
      user_id: userId,
      script_id: scriptId,
      stage_id: stageId,
      product_id: productId,
      card_header_id: cardHeaderId,
      ...rest,
    },
    {
      params: {save_id: POST_API_PATH.form},
      headers: {'Content-Type': 'multipart/form-data'},
    }
  )
}

export type PostTaskArgs = TaskInfoArgs & UserInfoArgs;
export const postTask= ({userId, scriptId, stageId}: PostTaskArgs) => {
  return axios.post<string>(
    API_PREFIX.post,
    {
      user_id: userId,
      script_id: scriptId,
      stage_id: stageId,
    },
    {
      params: {save_id: POST_API_PATH.task},
      headers: {'Content-Type': 'multipart/form-data'},
    }
  )
}