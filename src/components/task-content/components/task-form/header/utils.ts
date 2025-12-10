import type {FormInformation, FormInformationSection, SectionsFormConfig} from '@store/slices/task-slice';

import {
  distributionInfo,
  shopInfo,
  transportInfo,
} from './mock';

// todo: метод для конвертации костыльной структуры в FormInformation,
// удалить как бэк будет возвращать нормальные сущности
const convertSectionsFormConfigToFormInformation = (
  sectionsForm: SectionsFormConfig | undefined,
  title: FormInformation['title'],
  description: FormInformation['description'],
): FormInformation | null => {
  const elementCostsValues: Omit<FormInformationSection, 'title'> = (() => {
    if (sectionsForm?.costs.lists.fixed?.length && sectionsForm?.costs.lists.variable?.length) {
      return {
        lists: [
          {
            subtitle: 'Постоянные затраты',
            statistics: sectionsForm?.costs.lists.fixed,
          },
          {
            subtitle: 'Переменные затраты',
            statistics: sectionsForm?.costs.lists.variable,
          },
        ]
      };
    }

    if (sectionsForm?.costs.common?.length) {
      return {
        statistics: sectionsForm?.costs.common,
      };
    }

    return {};
  })();

  return {
    title,
    description,
    sections: [
      {
        title: 'Характеристики элемента',
        statistics: sectionsForm?.characteristics,
      },
      {
        title: 'Затраты элемента',
        ...elementCostsValues,
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
    case 'stage_card_supplier': {
      return convertSectionsFormConfigToFormInformation(
        sections,
        'Настройка политики управления запасами',
        'Поставщик - юридическое или физическое лицо, поставляющее товары' +
        ' заказчику в соответствии с дороворными условиями'
      );
    }
    case 'stage_card_wh': {
      return convertSectionsFormConfigToFormInformation(
        sections,
        'Настройка политики управления запасами',
        'Склад - помещение, предназначенное для приемки, размещения и дальнейшей' +
        ' подготовки материальных ценностей к отгрузке потребителям'
      )
    }
    case 'stage_card_distribution': return distributionInfo;
    case 'stage_card_transport': return transportInfo;
    default: return null;
  }
}