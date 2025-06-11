import axios from "axios";
import type {RawTasksDto} from "./tasks-slice-types";

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