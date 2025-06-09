import Table from 'antd/es/table';
import {Empty} from 'antd';
import cn from 'classnames';
import {useEffect, useState} from 'react';

import {selectTaskTableData} from '../../../../store/slices/task-slice';
import {useAppDispatch, useAppSelector} from '../../../../store/config/hooks';
import {loadChartDataByRowId} from '../../../../store/slices/task-slice/task-slice-thunks';

import styles from './custom-table.module.scss';

export const CustomTable = () => {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(selectTaskTableData);

  const [selectedRowId, setSelectedRowId] = useState<string|undefined>(undefined);

  useEffect(() => {
    if (tableData?.data?.[0]?.id) {
      setSelectedRowId(tableData?.data?.[0].id);
    }
  }, [tableData]);

  useEffect(() => {
    if (selectedRowId) {
      dispatch(loadChartDataByRowId({
        scriptId: 'SC0002',
        stageId: 'STG001',
        rowId: selectedRowId,
      }));
    }
  }, [selectedRowId]);


  const handleRowClick = (record: Record<string, number | string | boolean >) => {
    if (record?.id && typeof record.id === 'string') {
      setSelectedRowId(record.id);
    }
  }

  return (
    <>
      {
        tableData?.columns ? (
          <Table
            rowKey="Product_ID"
            scroll={{x: 'max-content'}}
            className={styles.table}
            columns={tableData.columns}
            dataSource={tableData?.data}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => handleRowClick(record)
              };
            }}
            rowClassName={(record) => (record.id === selectedRowId ? styles['selected-row'] : '')}
            size='small'
          />
        ) : (
          <Empty
            className={cn('fh', 'flex-col-center')}
            description="Таблица недоступна"
          />
        )
      }
    </>
  )
}
