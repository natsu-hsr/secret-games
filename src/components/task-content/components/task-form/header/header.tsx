import type {FC, ReactNode} from 'react';

import {HeaderGenerator} from './header-generator';
import {getHeaderInfoByTileApiName} from './utils';

interface HeaderProps {
  tileApiName: string;
  formNode: ReactNode;
}

export const Header: FC<HeaderProps> = ({tileApiName, formNode}) => {
  const infoData = getHeaderInfoByTileApiName(tileApiName);

  return (
    <>
      {infoData && <HeaderGenerator info={infoData} formNode={formNode} />}
    </>
  );
}