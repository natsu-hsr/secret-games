import type {FC, ReactNode} from 'react';

import {useAppSelector} from '@store/config/hooks';
import {selectTaskCommonData} from '@store/slices/task-slice';

import {HeaderGenerator} from './header-generator';
import {getHeaderInfoByTileApiName} from './utils';

interface HeaderProps {
  tileApiName: string;
  formNode: ReactNode;
}

export const Header: FC<HeaderProps> = ({tileApiName, formNode}) => {
  const {tileName} = useAppSelector(selectTaskCommonData) ?? {};
  // todo - передача tileName костыль, убрать как бэк добавит разные tileApiName для складов
  const infoData = getHeaderInfoByTileApiName(tileApiName, tileName);

  return (
    <>
      {infoData && tileName && <HeaderGenerator title={tileName} info={infoData} formNode={formNode} />}
    </>
  );
}