import {Button, Dropdown, type MenuProps} from 'antd';
import {EyeInvisibleOutlined, EyeOutlined, MoreOutlined, UploadOutlined} from '@ant-design/icons';
import type {FC} from 'react';

import styles from './styles.module.scss';

const renderMenuItems = (
  isTotalHidden: boolean, toggleTotalVisability: () => void, uploadFromExcel: () => void
): MenuProps['items'] => [
  {
    label: `${isTotalHidden ? 'Показать' : 'Скрыть'} Total-кривую`,
    key: 'toggle_total',
    icon: isTotalHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />,
    onClick: toggleTotalVisability,
  },
  {
    label: 'Выгрузить в excel',
    key: 'export_excel',
    icon: <UploadOutlined />,
    onClick: uploadFromExcel,
  },
];

interface ActionsMenuProps {
  isTotalHidden: boolean;
  toggleTotalVisability: () => void;
  uploadFromExcel: () => void;
}

export const ActionsMenu: FC<ActionsMenuProps> = ({isTotalHidden, toggleTotalVisability, uploadFromExcel}) => (
  <Dropdown
    className={styles['actions-menu']}
    menu={{items: renderMenuItems(isTotalHidden, toggleTotalVisability, uploadFromExcel)}}
  >
    <Button icon={<MoreOutlined />} />
  </Dropdown>
);