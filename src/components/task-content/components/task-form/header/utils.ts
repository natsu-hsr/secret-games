import type {FormInformation, SectionsFormConfig} from '@store/slices/task-slice';

import {
  distributionInfo,
  shopInfo,
  suppliersInfo,
  transportInfo,
} from './mock';

// todo: метод для конвертации костыльной структуры в FormInformation,
// удалить как бэк будет возвращать нормальные сущности
const convertSectionsFormConfigToFormInformation = (sectionsForm?: SectionsFormConfig): FormInformation | null => {
  return {
    title: 'Настройка политики управления запасами',
    description: 'Склад - помещение, предназначенное для приемки, размещения и дальнейшей' +
      ' подготовки материальных ценностей к отгрузке потребителям',
    sections: [
      {
        title: 'Характеристики элемента',
        statistics: sectionsForm?.characteristics,
      },
      {
        title: 'Затраты элемента',
        lists: [
          {
            subtitle: 'Постоянные затраты',
            statistics: sectionsForm?.costs.fixed ?? [],
          },
          {
            subtitle: 'Переменные затраты',
            statistics: sectionsForm?.costs.variable ?? [],
          },
        ]
      },
      {
        title: 'Параметры элемента',
        withForm: true,
      },
    ]
  }
}


export const getHeaderInfoByTileApiName = (
  tileApiName: string,
  sections?: SectionsFormConfig
): FormInformation | null => {
  switch (tileApiName) {
    case 'stage_card_shop': return shopInfo;
    case 'stage_card_suppliers':
    case 'stage_card_supplier': return suppliersInfo;
    case 'stage_card_wh': {
      return convertSectionsFormConfigToFormInformation(sections)
    }
    case 'stage_card_distribution': return distributionInfo;
    case 'stage_card_transport': return transportInfo;
    default: return null;
  }
}