import type {TTask} from './task-slice-types';

// Массив с мок-данными для заданий
export const mockTasks: TTask[] = [
  {
    id: 1,
    info: {
      title: 'Сценарий 1 - Задание',
      description: '5 магазинов продают 4 продукта. Цепь поставок включает 3 склада: 2 распределительных и 1 хаб.'
        + ' Цель — максимизировать денежный поток. Задача — определить механику управления запасами на всех'
        + ' складах цепи поставок для каждого продукта.',
    },
    mapData: [],
    chartData: [],
    tableData: {
      columns: [
        {
          title: 'Наименование',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Количество шт.',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: 'Производитель',
          dataIndex: 'manufacturer',
          key: 'manufacturer',
        },
        {
          title: 'Стоимость шт.',
          dataIndex: 'cost',
          key: 'cost',
        },
      ],
      data: [
        {
          key: '1',
          id: '1',
          name: 'Продукт 1',
          count: 1048,
          manufacturer: 'Япония',
          cost: 0.97,
          chartData: [
            {name: '24', y: 207},
            {name: '44', y: 89},
            {name: '64', y: 190},
            {name: '107', y: 61},
            {name: '150', y: 196},
            {name: '204', y: 96},
            {name: '254', y: 50},
          ],
        },
        {
          key: '2',
          id: '2',
          name: 'Продукт 2',
          count: 554,
          manufacturer: 'США',
          cost: 1.25,
          chartData: [
            {name: '0', y: 100},
            {name: '30', y: 105},
            {name: '60', y: 95},
            {name: '90', y: 110},
            {name: '120', y: 60},
            {name: '150', y: 150},
            {name: '180', y: 70},
            {name: '210', y: 180},
            {name: '240', y: 80},
            {name: '270', y: 175},
            {name: '300', y: 85},
            {name: '330', y: 190},
          ],
        },
        {
          key: '3',
          id: '3',
          name: 'Продукт 3',
          count: 703,
          manufacturer: 'Китай',
          cost: 0.67,
          chartData: [
            {name: '10', y: 120},
            {name: '30', y: 140},
            {name: '50', y: 60},
            {name: '70', y: 170},
            {name: '90', y: 50},
            {name: '110', y: 180},
            {name: '130', y: 90},
            {name: '150', y: 160},
            {name: '170', y: 75},
            {name: '190', y: 145},
          ],
        },
        {
          key: '4',
          id: '4',
          name: 'Продукт4',
          count: 898,
          manufacturer: 'Россия',
          cost: 1.1,
          chartData: [
            {name: '20', y: 180},
            {name: '40', y: 70},
            {name: '60', y: 160},
            {name: '100', y: 40},
            {name: '140', y: 190},
            {name: '200', y: 90},
            {name: '250', y: 150},
          ],
        },
      ]
    },
    tilesData: [
      {
        id: 1,
        title: 'Shop 1', 
        coordinates: [
          {id: 1, coordinates: [55.75, 37.57]},
          {id: 2, coordinates: [55.15, 37.30]},
          {id: 3, coordinates: [56.75, 35.57]},
        ],
        formConfig: {
          title: 'Параметры Shop 1',
          fields: [
            {name: 'name', label: 'Название', type: 'TEXT'},
            {name: 'value', label: 'Значение', type: 'TEXT'},
          ]
        },
      },
      {
        id: 2,
        title: 'Center', 
        coordinates: [
          {id: 1, coordinates: [33.67, 24.57]},
          {id: 2, coordinates: [35.15, 26.30]},
        ],
        formConfig: {
          title: 'Свойства Center',
          fields: [
            {name: 'param1', label: 'Параметр 1', type: 'TEXT'},
            {name: 'param2', label: 'Параметр 2', type: 'TEXT'},
            {name: 'param3', label: 'Параметр 3', type: 'TEXT'},
          ]
        },
      },
      {
        id: 3,
        title: 'Supplier', 
        coordinates: [
          {id: 1, coordinates: [44.75, 40.57]},
          {id: 2, coordinates: [55.15, 37.30]},
          {id: 3, coordinates: [37.75, 42.57]},
          {id: 4, coordinates: [50.75, 49.57]},
        ],
        formConfig: {
          title: 'Supplier данные',
          fields: [
            {name: 'orderData', label: 'Данные заказа', type: 'TEXT'},
          ]
        },
      },
      {
        id: 4,
        title: 'Post office', 
        coordinates: [
          {id: 1, coordinates: [18.75, 79.57]},
          {id: 2, coordinates: [12.15, 75.30]},
          {id: 3, coordinates: [20.75, 77.57]},
          {id: 4, coordinates: [15.75, 70.57]},
        ],
        formConfig: {
          title: 'Post office',
          fields: [
            {name: 'count', label: 'Количество', type: 'TEXT'},
            {name: 'size', label: 'Размер', type: 'TEXT'},
            {name: 'destination', label: 'Пункт назначения', type: 'TEXT'},
            {name: 'date', label: 'Дата', type: 'TEXT'},
          ]
        },
      },
    ],
    formConfig: undefined,
  },
];
