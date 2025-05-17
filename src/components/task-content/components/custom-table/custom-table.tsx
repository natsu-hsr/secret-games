import Table from 'antd/es/table';
import {useState} from 'react';

import {
  taskSliceActions,
  type TTableData,
} from '../../../../store/slices/task-slice';
import {useAppDispatch} from '../../../../store/config/hooks';

import styles from './custom-table.module.scss';

interface CustomTableProps {
  tableData: TTableData;
}

export const CustomTable = ({tableData}: CustomTableProps) => {
  const dispatch = useAppDispatch();
  const [selectedRowId, setSelectedRowId] = useState<number|undefined>(tableData.data?.[0].id ?? undefined);

  // todo
  const handleRowClick = (record: any) => {
    setSelectedRowId(record.id);
    dispatch(taskSliceActions.updateChartData(record?.chartData ?? {}));
  }

  return (
    <Table
      scroll={{x: 'max-content'}}
      className={styles.table}
      columns={tableData.columns}
      dataSource={tableData.data}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: () => handleRowClick(record)
        };
      }}
      rowClassName={(record) => (record.id === selectedRowId ? styles['selected-row'] : '')}
      size='small'
    />
  )
}
