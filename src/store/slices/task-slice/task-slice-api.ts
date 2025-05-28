import axios from "axios";
import {mockTasks} from "./_mock-data";
import type {TTask} from "./task-slice-types";

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

export const fetchTestData = () => {
  return axios.get(
    '/api_test.php',
    {
      params: {
        script_id: 'SC0002',
        stage_id: 'STG002',
      },
    }
  )
}