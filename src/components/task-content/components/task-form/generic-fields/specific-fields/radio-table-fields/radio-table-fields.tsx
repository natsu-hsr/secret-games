import FormItem from 'antd/es/form/FormItem';
import Table from 'antd/es/table';
import type {FC} from 'react';

import {useTableData} from './use-table-data';
import type {GenericFieldsProps} from '../../generic-fields';

export const RadioTableFields: FC<GenericFieldsProps> = ({fields}) => {
  const {columns, dataSource} = useTableData(fields);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <FormItem name="radioValue" noStyle />
    </div>
  )
}