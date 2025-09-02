import type {FormInformation} from '@store/slices/task-slice';

import {defaultInfo, shopInfo, suppliersInfo} from './mock';

export const getHeaderInfoByTileApiName = (tileApiName: string): FormInformation | null => {

  console.log('tileApiName=', tileApiName);
  if (tileApiName === 'stage_card_shop') {
    return shopInfo;
  }
  if (tileApiName === 'stage_card_suppliers') {
    return suppliersInfo;
  }
  if (tileApiName === '') {
    return defaultInfo;
  }
  if (tileApiName === '') {
    return defaultInfo;
  }


  return null;
}