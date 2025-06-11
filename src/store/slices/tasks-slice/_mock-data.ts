import type {TasksDto} from './tasks-slice-types';

export const mockScriptList: TasksDto = [
  {
    id: '1',
    name: 'Сценарий 1',
    active: true,
    stages: [
      {
        id: '1',
        name: 'Задача 1',
        active: false,
        hasResults: false,
      },
      {
        id: '2',
        name: 'Задача 2',
        active: false,
        hasResults: false,
      },
      {
        id: '3',
        name: 'Задача 3',
        active: false,
        hasResults: false,
      },
    ],
  },
  {
    id: 'SC0002',
    name: 'Сценарий 2',
    active: false,
    stages: [
      {
        id: 'STG001',
        name: 'Задача 1',
        active: true,
        hasResults: true,
      },
    ],
  },
];