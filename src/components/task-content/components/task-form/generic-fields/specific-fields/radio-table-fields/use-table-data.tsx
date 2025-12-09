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

  const dataSource: Record<string, string | number>[] = [];
  const rowsKeys = new Set<string>();

  const nonRadioFields = fields.filter(f => f.type !== 'radio');

  const columns: ColumnType[] = useMemo(() => {
    const calculatedColumns = fields
      .filter(f => f.type === 'radio')
      .map(f => {
        const radioPrefix = f.name.split('_')[0]; 
        return ({
          title: (
            <Radio
              defaultChecked={f.defaultValue === '1'}
              checked={f.name === selectedOptionName}
              onClick={() => setSelectedOptionName(f.name)}
              disabled={f.disabled}
            />
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

  

  fields
    .filter(f => f.type !== 'radio')
    .forEach(f => {
      const key = f.name.split(/_(.*)/s)[1];
      rowsKeys.add(key);
    });

  // формирование первой строки с названиями поставщиков
  // const titlesRow: Record<string, string> = {
  //   titles: '',
  // };
  // rowsKeys.forEach(rk => {
  //   const findedField = nonRadioFields.find(nrf => nrf.name.endsWith(rk));
  //   if (findedField) {
  //     const radioPrefix = findedField.name.split('_')[0];
  //     // const fieldRowKey = findedField.name.split(/_(.*)/s)[1];
  //     titlesRow[radioPrefix] = findedField.label;
  //   }
  // })

  // добавляем строки по ключам уникальных label (Название/Стоимость и тп)
  rowsKeys.forEach(rk => {
    dataSource.push({
        key: rk,
      })
  });

  // console.log('first titlesRow=', titlesRow);
  // console.log('first data=', dataSource);
  // console.log('rowsKeys=', rowsKeys);


  for (const nrf of nonRadioFields) {
    const radioPrefix = nrf.name.split('_')[0];
    const fieldRowKey = nrf.name.split(/_(.*)/s)[1];

    const findedDataRow = dataSource?.find(row => row.key === fieldRowKey);

    // console.log('nrf=', nrf);
    // console.log('radioPrefix=', radioPrefix);
    // console.log('fieldRowKey=', fieldRowKey);
    // console.log('findedDataRow=', findedDataRow);

    if (findedDataRow) {
      findedDataRow[radioPrefix] = +nrf.defaultValue;
      if (!findedDataRow.title) {
        findedDataRow.title = nrf.label;
      }
    }
  }

  return {
    columns,
    dataSource,
  }
}