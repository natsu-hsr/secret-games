import type {FC, ReactNode} from 'react';

import {useAppSelector} from '@store/config/hooks';
import {selectFormData, selectTaskCommonData} from '@store/slices/task-slice';

import {HeaderGenerator} from './header-generator';
import {getHeaderInfoByTileApiName} from './utils';
import type {FormInstance} from 'antd/es/form';

interface HeaderProps {
  tileApiName: string;
  formNode: ReactNode;
  // todo: костыль для отображения поля ввода в секциях вне формы, убрать после перехода на нормальную структуру
  form?: FormInstance;
}

export const Header: FC<HeaderProps> = ({tileApiName, formNode, form}) => {
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
          form={form}
        />
      )}
    </>
  );
}