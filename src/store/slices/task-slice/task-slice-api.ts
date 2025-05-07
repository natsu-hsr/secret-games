import {mockTasks} from "./_mock-data";
import type {TTask} from "./task-slice-types";

export interface FetchTaskArgs {
  id: number;
}
export const fetchTask = ({id}: FetchTaskArgs): Promise<{data: TTask}> => {
  return new Promise((resolve, reject) => {
    const findedTask = mockTasks.find(t => t.id === id);

    if (findedTask !== undefined) {
      resolve({data: findedTask});
    } else {
      reject(`Задание с id ${id} не найдено`);
    }
  });
}