import axios from "axios";
import {mockScriptList} from "./_mock-data";
import type {ScriptListDto} from "./tasks-slice-types";

export type UserIdArgs = {
  userId: string;
}

export type FetchTasksByUserIdArgs = UserIdArgs;
export const fetchTasksByUserId = ({userId}: FetchTasksByUserIdArgs) => {
  console.log('userId=', userId);
  return Promise.resolve<ScriptListDto>(mockScriptList);
}

export const fetchTestTasksByUserId = () => {
  return axios.get(
    'api.php',
    {
      params: {
        api_id: 'stage_list',
        student_id: 'ST000001',
      }
    }
  );
}