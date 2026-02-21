import {Radio, Form} from 'antd';
import type {ColumnType} from 'antd/es/table';
import {useEffect, useMemo, useState} from 'react';

import type {FormFieldsDto} from '@store/slices/task-slice';

export const useTableData = (fields: FormFieldsDto) => {
  const [
    selectedOptionName, setSelectedOptionName,
  ] = useState<string | undefined>(() => fields.filter(f => f.type === 'radio').find(f => f.defaultValue === '1')?.name)
  const form = Form.useFormInstance();

  useEffect(() => {
    if (!selectedOptionName) {
      return;
    }

    form.setFieldsValue({radioValue: selectedOptionName})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionName]);

  const dataSource: (Record<string, string | number>)[] = [];

  // поля с типом radio - столбцы, header - названия столбцов
  const rowsFields = fields.filter(f => f.type !== 'radio' && f.type !== 'header');

  const columns: ColumnType[] = useMemo(() => {
    const calculatedColumns = fields
      .filter(f => f.type === 'radio')
      .map(f => {
        // выступает как идентификатор столбца - название параметра, данные которого лежат в столбце
        const radioPrefix = f.name.split('_')[0]; 

        const colTitle = fields.find(f => f.type === 'header' && f.parentId === radioPrefix)?.defaultValue;

        return ({
          title: (
            <>
              {colTitle}
              &nbsp;
              <Radio
                defaultChecked={f.defaultValue === '1'}
                checked={f.name === selectedOptionName}
                onClick={() => setSelectedOptionName(f.name)}
                disabled={f.disabled}
              />
            </>
          ),
          key: radioPrefix,
          dataIndex: radioPrefix,
        })
      });

    return [
      {title: '', key: 'title', dataIndex: 'title'},
      ...calculatedColumns,
    ]
  }, [selectedOptionName, fields]);
  

  rowsFields
    .forEach(f => {
      const key = f.name.split(/_(.*)/s)[1];
      const addedRowKeys = dataSource.map(ds => ds?.key);


      // добавляем строки по ключам уникальных label (Название/Стоимость и тп)
      if (!addedRowKeys.includes(key)) {
        dataSource.push({
          key,
        });
      }
    });

  for (const rf of rowsFields) {
    const radioPrefix = rf.name.split('_')[0];
    const fieldRowKey = rf.name.split(/_(.*)/s)[1];

    const foundedDataRow = dataSource?.find(row => row.key === fieldRowKey);

    if (!foundedDataRow) {
      break;
    }

    foundedDataRow[radioPrefix] = +rf.defaultValue;

    if (!foundedDataRow.title) {
      foundedDataRow.title = rf.label;
    }
  }

  return {
    columns,
    dataSource,
  }
}