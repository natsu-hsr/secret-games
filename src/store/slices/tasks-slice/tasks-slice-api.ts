import axios from 'axios';

import type {RawTasksDto, UpdatedTaskStatus} from './tasks-slice-types';

export type UserIdArgs = {
  userId: string;
}

export type FetchTasksByUserIdArgs = UserIdArgs;
export const fetchTasksByUserId = ({userId}: FetchTasksByUserIdArgs) => {
  return axios.get<RawTasksDto>(
    'api.php',
    {
      params: {
        api_id: 'stage_list',
        user_id: userId,
      }
    }
  );
}

export type FetchTaskStatusArgs = UserIdArgs & {
  stageId: string;
  scriptId: string;
};
export const fetchTaskStatus = ({userId, stageId, scriptId}: FetchTaskStatusArgs) => {
  return axios.get<UpdatedTaskStatus[]>(
    'api.php',
    {
      params: {
        api_id: 'stage_status',
        user_id: userId,
        script_id: scriptId,
        stage_id: stageId,
      }
    }
  )
}