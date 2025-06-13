import Table from 'antd/es/table';
import {Empty} from 'antd';
import cn from 'classnames';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {
  loadChartDataByRowId,
  loadTilesDataByRowId,
  selectTableSelectedRowId,
  selectTaskTableData,
  taskSliceActions,
} from '@store/slices/task-slice';

import styles from './custom-table.module.scss';

export const CustomTable = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();

  const tableData = useAppSelector(selectTaskTableData);
  const selectedRowId = useAppSelector(selectTableSelectedRowId);

  useEffect(() => {
    if (!selectedRowId || !scriptId || !stageId) return;

    dispatch(loadChartDataByRowId({
      scriptId,
      stageId,
      rowId: selectedRowId,
    }));

    dispatch(taskSliceActions.resetFormFields());

    dispatch(loadTilesDataByRowId({
      scriptId,
      stageId,
      rowId: selectedRowId,
    }));
  }, [selectedRowId, scriptId, stageId]);


  const handleRowClick = (record: Record<string, number | string | boolean >) => {
    if (!record?.id || typeof record.id !== 'string') return;

    dispatch(taskSliceActions.setSelectedTableRowId(record.id));
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
