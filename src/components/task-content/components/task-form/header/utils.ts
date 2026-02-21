import isEmpty from 'lodash/isEmpty';

import type {FormInformation, FormInformationSection, SectionsFormConfig} from '@store/slices/task-slice';


import {
  distributionInfo,
  shopInfo,
} from './mock';

const TRANSPORT_TITLE = 'Транспорт';

// todo: метод для конвертации костыльной структуры в FormInformation,
// удалить как бэк будет возвращать нормальные сущности
const convertSectionsFormConfigToFormInformation = (
  sectionsForm: SectionsFormConfig | undefined,
  title: FormInformation['title'],
  description: FormInformation['description'],
): FormInformation | null => {
  const elementCostsValues: Omit<FormInformationSection, 'title'> = (() => {
    if (sectionsForm?.costs.lists.fixed?.length || sectionsForm?.costs.lists.variable?.length) {
      return {
        lists: [
          ...(
            sectionsForm?.costs.lists.fixed?.length ? [{
              subtitle: 'Постоянные затраты',
              statistics: sectionsForm?.costs.lists.fixed,
            }] : []
          ),
          ...(
            sectionsForm?.costs.lists.variable?.length ? [{
              subtitle: 'Переменные затраты',
              statistics: sectionsForm?.costs.lists.variable,
            }] : []
          ),
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

  const params = title === TRANSPORT_TITLE ? sectionsForm?.params : sectionsForm?.formParams;

  return {
    title,
    description,
    sections: [
      ...(!isEmpty(sectionsForm?.characteristics) ? [{
          title: 'Характеристики элемента',
          statistics: sectionsForm?.characteristics,
        }] : []),
      ...(!isEmpty(elementCostsValues) ? [{
          title: 'Затраты элемента',
          ...elementCostsValues,
        }] : []),
      ...(!isEmpty(params) ?[{
          title: 'Параметры элемента',
          ...(title === TRANSPORT_TITLE ? [params] : []),
          withForm: title !== TRANSPORT_TITLE,
        }] : []),
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
      );
    }
    case 'stage_card_distribution': return distributionInfo;
    case 'stage_card_transport': {
      return convertSectionsFormConfigToFormInformation(
        sections,
        TRANSPORT_TITLE,
        'Транспорт - осуществляет перемещение продукции от элемента источника к получателю,' +
        ' различными типами транспортных средств и способами доставки',
      );
    }
    default: return null;
  }
}