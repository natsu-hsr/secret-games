import type {FormInformation} from '@store/slices/task-slice';

import {distributionInfo, shopInfo, suppliersInfo, warehouseInfo} from './mock';

export const getHeaderInfoByTileApiName = (tileApiName: string): FormInformation | null => {
  if (tileApiName === 'stage_card_shop') {
    return shopInfo;
  }
  if (tileApiName === 'stage_card_suppliers' || tileApiName === 'stage_card_supplier') {
    return suppliersInfo;
  }
  if (tileApiName === 'stage_card_wh') {
    return warehouseInfo;
  }
  if (tileApiName === 'stage_card_distribution') {
    return distributionInfo;
  }

  return null;
}