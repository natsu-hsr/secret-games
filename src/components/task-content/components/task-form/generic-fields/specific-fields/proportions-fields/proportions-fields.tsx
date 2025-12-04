import {Divider, InputNumber, Typography} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import  {type FC} from 'react';

import styles from './styles.module.scss';
import {convertFieldsToProportions} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

const STEP = 0.01;
const PRECISION = 2;

export const ProportionsFields: FC<GenericFieldsProps> = ({form, fields}) => {
  const proportionsFields = convertFieldsToProportions(fields);
  const names = proportionsFields.map(pf => pf.name);

  return (
    <>
      {/* Суммарная подсказка */}
      <FormItem className={styles.hint} shouldUpdate>
        {() => {
          const sum = names
            .map(name => Number(form.getFieldValue(name) || 0))
            .reduce((a, b) => a + b, 0);

          return sum <= 1 && sum > 0
            ? <Typography.Text type="success">Сумма: {sum.toFixed(PRECISION)}</Typography.Text>
            : <Typography.Text type="danger">
              Сумма по всем узлам должна быть ≤1 (текущая: {sum.toFixed(PRECISION)})
            </Typography.Text>;
        }}
      </FormItem>
      <Divider className={styles.divider} />
      {proportionsFields?.map(pf => (
        <FormItem
          key={pf.name}
          name={pf.name}
          label={(
            <>
              <div className={styles['pre-label']}>
                {pf?.preLabel?.label} {pf?.preLabel?.value}
              </div>
              &nbsp;-&nbsp;
              {pf.label}
            </>
          )}
          initialValue={pf.defaultValue}
        >
          <InputNumber
            disabled={pf.disabled}
            step={STEP}
            precision={PRECISION}
           />
        </FormItem>
      ))}
    </>
  )
}