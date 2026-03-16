import type {FC, ReactNode} from 'react';

import {useAppSelector} from '@store/config/hooks';
import {selectFormData, selectTaskCommonData} from '@store/slices/task-slice';

import {HeaderGenerator} from './header-generator';
import {getHeaderInfoByTileApiName} from './utils';

interface HeaderProps {
  tileApiName: string;
  formNode: ReactNode;
}

export const Header: FC<HeaderProps> = ({tileApiName, formNode}) => {
  const {tileName} = useAppSelector(selectTaskCommonData) ?? {};
  const {sections} = useAppSelector(selectFormData) ?? {};

  const infoData = getHeaderInfoByTileApiName(tileApiName, sections);

  return (
    <>
      {infoData && tileName && (
        <HeaderGenerator
          title={tileName}
          info={infoData}
          formNode={formNode}
        />
      )}
    </>
  );
}