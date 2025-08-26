import {Empty} from 'antd';
import Table from 'antd/es/table';
import cn from 'classnames';

import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {
  selectTaskCommonData,
  selectTaskTableData,
  taskSliceActions,
} from '@store/slices/task-slice';

import styles from './styles.module.scss';

export const CustomTable = () => {
  const dispatch = useAppDispatch();

  const tableData = useAppSelector(selectTaskTableData);
  const {tableRowId: selectedRowId} = useAppSelector(selectTaskCommonData) ?? {};

  const handleRowClick = (record: Record<string, number | string | boolean >) => {
    if (!record?.id || typeof record.id !== 'string') return;
    if (!record?.['Product_Name'] || typeof record?.['Product_Name'] !== 'string') return;

    dispatch(taskSliceActions.setTableCommonDataWithReset({
      tableRowId: record.id,
      tableRowName: record['Product_Name'],
    }));
  }

  return (
    <>
      {
        tableData?.columns ? (
          <Table
            className={styles.table}
            rowKey="Product_ID"
            scroll={{x: 'max-content'}}
            columns={tableData.columns}
            dataSource={tableData?.data}
            pagination={false}
            onRow={record => ({
              onClick: () => handleRowClick(record)
            })}
            rowClassName={record => (record.id === selectedRowId ? styles['selected-row'] : '')}
            size='small'
          />
        ) : (
          <Empty
            className={cn('fh', 'flex-col-center')}
            description="Данные таблицы не найдены"
          />
        )
      }
    </>
  )
}
