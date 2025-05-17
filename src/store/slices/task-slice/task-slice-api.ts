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