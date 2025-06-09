import type {TTask} from './task-slice-types';

export const mockTasks: TTask[] = [];

// // Массив с мок-данными для заданий
// export const mockTasks: TTask[] = [
//   {
//     groupId: 1,
//     id: 1,
//     info: {
//       title: 'Сценарий 1 - Задание',
//       description: '5 магазинов продают 4 продукта. Цепь поставок включает 3 склада: 2 распределительных и 1 хаб.'
//         + ' Цель — максимизировать денежный поток. Задача — определить механику управления запасами на всех'
//         + ' складах цепи поставок для каждого продукта.',
//     },
//     mapData: [],
//     chartData: [],
//     tableData: {
//       columns: [
//         {
//           title: 'Наименование',
//           dataIndex: 'name',
//           key: 'name',
//         },
//         {
//           title: 'Количество шт.',
//           dataIndex: 'count',
//           key: 'count',
//         },
//         {
//           title: 'Производитель',
//           dataIndex: 'manufacturer',
//           key: 'manufacturer',
//         },
//         {
//           title: 'Стоимость шт.',
//           dataIndex: 'cost',
//           key: 'cost',
//         },
//       ],
//       data: [
//         {
//           key: '1',
//           id: '1',
//           name: 'Продукт 1',
//           count: 1048,
//           manufacturer: 'Япония',
//           cost: 0.97,
//           chartData: [
//             {name: '24', y: 207},
//             {name: '44', y: 89},
//             {name: '64', y: 190},
//             {name: '107', y: 61},
//             {name: '150', y: 196},
//             {name: '204', y: 96},
//             {name: '254', y: 50},
//           ],
//         },
//         {
//           key: '2',
//           id: '2',
//           name: 'Продукт 2',
//           count: 554,
//           manufacturer: 'США',
//           cost: 1.25,
//           chartData: [
//             {name: '0', y: 100},
//             {name: '30', y: 105},
//             {name: '60', y: 95},
//             {name: '90', y: 110},
//             {name: '120', y: 60},
//             {name: '150', y: 150},
//             {name: '180', y: 70},
//             {name: '210', y: 180},
//             {name: '240', y: 80},
//             {name: '270', y: 175},
//             {name: '300', y: 85},
//             {name: '330', y: 190},
//           ],
//         },
//         {
//           key: '3',
//           id: '3',
//           name: 'Продукт 3',
//           count: 703,
//           manufacturer: 'Китай',
//           cost: 0.67,
//           chartData: [
//             {name: '10', y: 120},
//             {name: '30', y: 140},
//             {name: '50', y: 60},
//             {name: '70', y: 170},
//             {name: '90', y: 50},
//             {name: '110', y: 180},
//             {name: '130', y: 90},
//             {name: '150', y: 160},
//             {name: '170', y: 75},
//             {name: '190', y: 145},
//           ],
//         },
//         {
//           key: '4',
//           id: '4',
//           name: 'Продукт4',
//           count: 898,
//           manufacturer: 'Россия',
//           cost: 1.1,
//           chartData: [
//             {name: '20', y: 180},
//             {name: '40', y: 70},
//             {name: '60', y: 160},
//             {name: '100', y: 40},
//             {name: '140', y: 190},
//             {name: '200', y: 90},
//             {name: '250', y: 150},
//           ],
//         },
//       ]
//     },
//     tilesData: [
//       {
//         id: 1,
//         title: 'C1',
//         coordinates: [
//           [1, 1], [1, 2], [2, 1],
//         ],
//         mapData: [
//           {
//             id: '1',
//             name: 'Москва',
//             latitude: 55.75,
//             longitude: 37.57,
//             labelType: '',
//             draggable: 
//             coordinates: [, ]
//           },
//           {
//             id: '2',
//             coordinates: [55.15, 37.30]
//           },
//           {
//             id: '3',
//             coordinates: [56.75, 35.57],
//           },
//         ],
//         formConfig: {
//           title: 'Параметры Shop 1',
//           fields: [
//             {name: 'name', label: 'Название', type: 'TEXT'},
//             {name: 'value', label: 'Значение', type: 'TEXT'},
//           ]
//         },
//       },
//       {
//         id: 2,
//         title: 'C2',
//         coordinates: [
//           [3, 1], [4, 1], [2, 2], [3, 2],
//         ],
//         mapData: [
//           {id: 1, coordinates: [33.67, 24.57]},
//           {id: 2, coordinates: [35.15, 26.30]},
//         ],
//         formConfig: {
//           title: 'Свойства Center',
//           fields: [
//             {name: 'param1', label: 'Параметр 1', type: 'TEXT'},
//             {name: 'param2', label: 'Параметр 2', type: 'TEXT'},
//             {name: 'param3', label: 'Параметр 3', type: 'TEXT'},
//           ]
//         },
//       },
//       {
//         id: 3,
//         title: 'T1',
//         coordinates: [
//           [1, 3], [2, 3], [1, 4], [2, 4], [3, 4], [4, 4],
//         ],
//         mapData: [
//           {id: 1, coordinates: [44.75, 40.57]},
//           {id: 2, coordinates: [55.15, 37.30]},
//           {id: 3, coordinates: [37.75, 42.57]},
//           {id: 4, coordinates: [50.75, 49.57]},
//         ],
//         formConfig: {
//           title: 'Supplier данные',
//           fields: [
//             {name: 'orderData', label: 'Данные заказа', type: 'TEXT'},
//           ]
//         },
//       },
//       {
//         id: 4,
//         title: 'C3',
//         coordinates: [
//           [3, 3], [4, 2], [4, 3],
//         ],
//         mapData: [
//           {id: 1, coordinates: [18.75, 79.57]},
//           {id: 2, coordinates: [12.15, 75.30]},
//           {id: 3, coordinates: [20.75, 77.57]},
//           {id: 4, coordinates: [15.75, 70.57]},
//         ],
//         formConfig: {
//           title: 'Post office',
//           fields: [
//             {name: 'count', label: 'Количество', type: 'TEXT'},
//             {name: 'size', label: 'Размер', type: 'TEXT'},
//             {name: 'destination', label: 'Пункт назначения', type: 'TEXT'},
//             {name: 'date', label: 'Дата', type: 'TEXT'},
//           ]
//         },
//       },
//     ],
//     formConfig: undefined,
//   },
//   {
//     groupId: 1,
//     id: 2,
//     info: {
//       title: 'Сценарий 2 - Оптимизация маршрутов',
//       description: 'Вам нужно оптимизировать маршруты доставки для 10 грузовиков, которые обслуживают 15 клиентов в 3 городах. '
//         + 'Каждый грузовик имеет ограничение по грузоподъёмности (5 тонн) и времени работы (8 часов). '
//         + 'Цель — минимизировать общее время доставки и количество использованных грузовиков.',
//     },
//     mapData: [],
//     chartData: [],
//     tableData: {
//       columns: [
//         {
//           title: 'Грузовик',
//           dataIndex: 'truck',
//           key: 'truck',
//         },
//         {
//           title: 'Грузоподъёмность (тонн)',
//           dataIndex: 'capacity',
//           key: 'capacity',
//         },
//         {
//           title: 'Город',
//           dataIndex: 'city',
//           key: 'city',
//         },
//         {
//           title: 'Время доставки (ч)',
//           dataIndex: 'deliveryTime',
//           key: 'deliveryTime',
//         },
//       ],
//       data: [
//         {
//           key: '1',
//           id: '1',
//           truck: 'Грузовик 1',
//           capacity: 4.8,
//           city: 'Москва',
//           deliveryTime: 6.5,
//           chartData: [
//             {name: '0', y: 0},
//             {name: '2', y: 13.5},
//             {name: '4', y: 3.0},
//             {name: '6', y: 4.5},
//             {name: '8', y: 6.5},
//           ],
//         },
//         {
//           key: '2',
//           id: '2',
//           truck: 'Грузовик 2',
//           capacity: 4.2,
//           city: 'Санкт-Петербург',
//           deliveryTime: 7.0,
//           chartData: [
//             {name: '0', y: 0},
//             {name: '3', y: 22.0},
//             {name: '5', y: 42.0},
//             {name: '7', y: 6.0},
//             {name: '8', y: 7.0},
//           ],
//         },
//         {
//           key: '3',
//           id: '3',
//           truck: 'Грузовик 3',
//           capacity: 4.9,
//           city: 'Екатеринбург',
//           deliveryTime: 5.5,
//           chartData: [
//             {name: '0', y: 0},
//             {name: '1', y: 1.0},
//             {name: '3', y: 22.5},
//             {name: '5', y: 4.0},
//             {name: '7', y: 53.5},
//           ],
//         },
//       ],
//     },
//     tilesData: [
//       {
//         id: 1,
//         title: 'R1',
//         coordinates: [
//           [1, 1], [2, 1], [2, 2],
//         ],
//         mapData: [
//           {id: 1, coordinates: [55.7558, 37.6173]},
//           {id: 2, coordinates: [59.9343, 30.3351]},
//         ],
//         formConfig: {
//           title: 'Маршрут 1',
//           fields: [
//             {name: 'startPoint', label: 'Точка отправления', type: 'TEXT'},
//             {name: 'endPoint', label: 'Точка назначения', type: 'TEXT'},
//             {name: 'distance', label: 'Расстояние (км)', type: 'TEXT'},
//           ],
//         },
//       },
//       {
//         id: 2,
//         title: 'R2',
//         coordinates: [
//           [3, 2], [3, 3], [4, 2],
//         ],
//         mapData: [
//           {id: 1, coordinates: [56.8519, 60.6122]},
//           {id: 2, coordinates: [55.0084, 82.9357]},
//         ],
//         formConfig: {
//           title: 'Маршрут 2',
//           fields: [
//             {name: 'truckId', label: 'ID грузовика', type: 'TEXT'},
//             {name: 'timeLimit', label: 'Лимит времени (ч)', type: 'TEXT'},
//           ],
//         },
//       },
//     ],
//     formConfig: undefined,
//   },
//   {
//     groupId: 2,
//     id: 1,
//     info: {
//       title: 'Сценарий 3 - Анализ производства',
//       description: 'На заводе работают 4 производственные линии, выпускающие 2 типа продукции: A и B. '
//         + 'Каждая линия имеет разную производительность и уровень брака. '
//         + 'Цель — определить оптимальное распределение производства между линиями, чтобы минимизировать брак и максимизировать выпуск продукции.',
//     },
//     mapData: [],
//     chartData: [],
//     tableData: {
//       columns: [
//         {
//           title: 'Линия',
//           dataIndex: 'line',
//           key: 'line',
//         },
//         {
//           title: 'Продукция',
//           dataIndex: 'product',
//           key: 'product',
//         },
//         {
//           title: 'Производительность (шт./ч)',
//           dataIndex: 'productivity',
//           key: 'productivity',
//         },
//         {
//           title: 'Уровень брака (%)',
//           dataIndex: 'defectRate',
//           key: 'defectRate',
//         },
//       ],
//       data: [
//         {
//           key: '1',
//           id: '1',
//           line: 'Линия 1',
//           product: 'A',
//           productivity: 500,
//           defectRate: 2.5,
//           chartData: [
//             {name: '0', y: 80},
//             {name: '5', y: 490},
//             {name: '10', y: 500},
//             {name: '15', y: 295},
//             {name: '20', y: 510},
//           ],
//         },
//         {
//           key: '2',
//           id: '2',
//           line: 'Линия 2',
//           product: 'B',
//           productivity: 450,
//           defectRate: 3.0,
//           chartData: [
//             {name: '0', y: 240},
//             {name: '5', y: 445},
//             {name: '10', y: 450},
//             {name: '15', y: 1455},
//             {name: '20', y: 460},
//           ],
//         },
//         {
//           key: '3',
//           id: '3',
//           line: 'Линия 3',
//           product: 'A',
//           productivity: 600,
//           defectRate: 1.8,
//           chartData: [
//             {name: '0', y: 590},
//             {name: '5', y: 295},
//             {name: '10', y: 100},
//             {name: '15', y: 1605},
//             {name: '20', y: 810},
//           ],
//         },
//         {
//           key: '4',
//           id: '4',
//           line: 'Линия 4',
//           product: 'B',
//           productivity: 400,
//           defectRate: 4.0,
//           chartData: [
//             {name: '0', y: 290},
//             {name: '5', y: 510},
//             {name: '20', y: 395},
//           ],
//         },
//       ],
//     },
//     tilesData: [
//       {
//         id: 1,
//         title: 'P1',
//         coordinates: [
//           [2, 3], [3, 2], [3, 3], [3, 4],
//         ],
//         mapData: [
//           {id: 1, coordinates: [35.42, 139.36]},
//           {id: 2, coordinates: [35.01, 135.45]},
//         ],
//         formConfig: {
//           title: 'Настройки линии 1',
//           fields: [
//             {name: 'productType', label: 'Тип продукции', type: 'TEXT'},
//             {name: 'shiftHours', label: 'Часы работы (ч)', type: 'TEXT'},
//           ],
//         },
//       },
//       {
//         id: 2,
//         title: 'P2',
//         coordinates: [
//           [3, 1], [4, 1], [4, 2], [4, 3], [4, 4],
//         ],
//         mapData: [
//           {id: 1, coordinates: [34.41, 135.30]},
//         ],
//         formConfig: {
//           title: 'Настройки линии 2',
//           fields: [
//             {name: 'maintenanceSchedule', label: 'График техобслуживания', type: 'TEXT'},
//             {name: 'operatorCount', label: 'Количество операторов', type: 'TEXT'},
//           ],
//         },
//       },
//       {
//         id: 3,
//         title: 'P3',
//         coordinates: [
//           [1, 1], [2, 1], [1, 2], [2, 2], [1, 3], [1, 4],
//         ],
//         mapData: [
//           {id: 1, coordinates: [35.07, 136.56]},
//         ],
//         formConfig: {
//           title: 'Настройки линии 3',
//           fields: [
//             {name: 'targetProductivity', label: 'Целевая производительность (шт./ч)', type: 'TEXT'},
//           ],
//         },
//       },
//     ],
//     formConfig: undefined,
//   },
// ];
