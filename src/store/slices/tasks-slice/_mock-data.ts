import type {ScriptListDto} from './tasks-slice-types';

export const mockScriptList: ScriptListDto = [
  {
    id: '1',
    name: 'Сценарий 1',
    active: true,
    stages: [
      {
        id: '1',
        name: 'Задача 1',
        active: false,
      },
      {
        id: '2',
        name: 'Задача 2',
        active: false,
      },
      {
        id: '3',
        name: 'Задача 3',
        active: false,
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
      },
    ],
  },
];