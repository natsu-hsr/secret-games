import type {FormInformation} from '@store/slices/task-slice';

export const defaultInfo: FormInformation = {
  title: 'Настройка политики управления запасами',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere ' +
    'mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.',
  sections: [
    {
      title: 'Характеристики элемента',
      statistics: [
        {label: 'Локация', value: 'Япония'},
        {label: 'Тип склада', value: 'Надежный'},
        {label: 'Площадь склада', value: '50000'},
        {label: 'Объем склада', value: '123312'},
        {label: 'Площадь зоны приемки', value: '30000'},
        {label: 'Площадь зоны отгрузки', value: '20000'},
      ]
    },
    {
      title: 'Затраты по элементу',
      lists: [
        {
          subtitle: 'Постоянные затраты',
          statistics: [
            {label: 'Аренда', value: '330000'},
            {label: 'Коммунальные платежи', value: '30000'},
            {label: 'Персонал', value: '200000'},
            {label: 'Поддержка IT', value: '10000'},
          ]
        },
        {
          subtitle: 'Переменные затраты',
          statistics: [
            {label: 'Тариф на приемку', value: '3000'},
            {label: 'Тариф на хранение', value: '5500'},
            {label: 'Тариф на комплектацию', value: '1200'},
            {label: 'Упаковочные материалы', value: '2000'},
            {label: 'Резервирование площадей', value: '30000'},
            {label: 'Площадь зоны отгрузки', value: '100'},
          ]
        },
      ]
    },
    {
      title: 'Параметры материального потока',
      withForm: true,
      statistics: [
        {label: 'Запасы на начало периода', value: '12455'},
        {label: 'Политика упр. запасами', value: 'Надежная'},
        {label: 'Параметры политики', value: '3FjnASD'},
      ]
    },
  ]
};

export const suppliersInfo: FormInformation = {
  title: 'Настройка политики управления запасами',
  description: 'Поставщик - юридическое или физическое лицо, поставляющее товары' +
    ' заказчику в соответствии с дороворными условиями',
  sections: [
    {
      title: 'Характеристики элемента',
      statistics: [
        {label: 'Тип', value: 'МСП'},
        {label: 'Категория', value: 'Дистрибьютер'},
        {label: 'Финансовая стабильность', value: 'Высокая'},
        {label: 'Уровень сервиса', value: '100%'},
        {label: '%, брака', value: '0%'},
        {label: 'Средний срок задержки, дни', value: '0'},
        {label: 'Ограничение по объему, шт/мес.', value: 'Отсутствует'},
        {label: 'Минимальная партия заказа, шт.', value: '1'},
        {label: 'Кратность заказа, шт.', value: 'Дистрибьютер'},
        {label: 'Расположение', value: 'Ярославль'},
      ]
    },
    {
      title: 'Затраты элемента',
      statistics: [
        {label: 'Размещение и сопровождение заказа, руб./шт.', value: '0'},
        {label: 'Ведение претензионной деятельности, руб./шт.', value: '0'},
        {label: 'Контроль качества, руб./поставка', value: '0'},
      ]
    },
    {
      title: 'Параметры элемента',
      withForm: true,
    },
  ]
};

export const shopInfo: FormInformation = {
  title: 'Настройка политики управления запасами',
  description: 'Магазин у дома - небольшой магазин, предназначенный для удовлетворения'
    + ' потребности в товарах массового потребления, живущих неподалеку покупателей',
  sections: [
    {
      title: 'Характеристики элемента',
      statistics: [
        {label: 'Тип клиента', value: 'B2C'},
        {label: 'Тип сроса', value: 'Регулярный'},
        {label: 'Качество спроса', value: '100%'},
        {label: 'Условие оплаты', value: 'При получении'},
        {label: 'Отклик на низкий уровень сервиса', value: 'Отсутствует'},
        {label: 'Ограничени на объем хранения, м3', value: 'Отсутствует'},
        {label: 'График приемки товара', value: '24/7/365'},
        {label: 'Расположение', value: 'Ярославль'},
      ]
    },
    {
      title: 'Затраты элемента',
      statistics: [
        {label: 'Персонал', value: '0'},
        {label: 'Аренда помещения, руб./мес.', value: '0'},
        {label: 'Коммунальные услуги, руб./мес.', value: '0'},
        {label: 'Прочие разовые затраты, руб./мес.', value: '0'},
        {label: '% потерь, краж от запаса', value: '0%'},
        {label: '% неликвидов от запаса', value: '0%'},
      ]
    },
    {
      title: 'Параметры элемента',
      withForm: true,
    },
  ]
};

export const warehouseInfo: FormInformation = {
  title: 'Настройка политики управления запасами',
  description: 'Склад - помещение, предназначенное для приемки, размещения и дальнейшей' +
    ' подготовки материальных ценностей к отгрузке потребителям',
  sections: [
    {
      title: 'Характеристики элемента',
      statistics: [
        {label: 'Тип:', value: 'Распределительный'},
        {label: 'Класс:', value: 'B+'},
        {label: 'Тип владения:', value: 'Аутсорсинг услуг'},
        {label: 'Объем склада', value: '123312'},
        {label: 'Площадь зоны приемки', value: '30000'},
        {label: 'Площадь зоны отгрузки', value: '20000'},
      ]
    },
    {
      title: 'Затраты по элементу',
      lists: [
        {
          subtitle: 'Постоянные затраты',
          statistics: [
            {label: 'Аренда', value: '330000'},
            {label: 'Коммунальные платежи', value: '30000'},
            {label: 'Персонал', value: '200000'},
            {label: 'Поддержка IT', value: '10000'},
          ]
        },
        {
          subtitle: 'Переменные затраты',
          statistics: [
            {label: 'Тариф на приемку', value: '3000'},
            {label: 'Тариф на хранение', value: '5500'},
            {label: 'Тариф на комплектацию', value: '1200'},
            {label: 'Упаковочные материалы', value: '2000'},
            {label: 'Резервирование площадей', value: '30000'},
            {label: 'Площадь зоны отгрузки', value: '100'},
          ]
        },
      ]
    },
    {
      title: 'Параметры материального потока',
      withForm: true,
      statistics: [
        {label: 'Запасы на начало периода', value: '12455'},
        {label: 'Политика упр. запасами', value: 'Надежная'},
        {label: 'Параметры политики', value: '3FjnASD'},
      ]
    },
  ]
};