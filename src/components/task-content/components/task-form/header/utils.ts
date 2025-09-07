import type {FormInformation} from '@store/slices/task-slice';

import {distributionInfo, shopInfo, suppliersInfo, transportInfo, warehouseInfo} from './mock';

export const getHeaderInfoByTileApiName = (tileApiName: string): FormInformation | null => {
  switch (tileApiName) {
    case 'stage_card_shop': return shopInfo;
    case 'stage_card_suppliers':
    case 'stage_card_supplier': return suppliersInfo;
    case 'stage_card_wh': return warehouseInfo;
    case 'stage_card_distribution': return distributionInfo;
    case 'stage_card_transport': return transportInfo;
    default: return null;
  }
}