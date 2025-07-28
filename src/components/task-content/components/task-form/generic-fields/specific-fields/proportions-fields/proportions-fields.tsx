import {Divider, InputNumber, Typography} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import  {type FC} from 'react';

import styles from './styles.module.scss';
import {convertFieldsToProportions} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

export const ProportionsFields: FC<GenericFieldsProps> = ({form, fields, setValid}) => {
  const proportionsFields = convertFieldsToProportions(fields);

  return (
    <>
      {/* Суммарная подсказка */}
      <FormItem className={styles.hint} shouldUpdate>
        {() => {
          const vals: Record<string, unknown> = form.getFieldsValue();
          const sum: number = Object.values(vals)
          .reduce((s: number, v: unknown) => {
            if (typeof v !== 'number') {
              return s;
            }
            return s + v;
          }, 0);

          const isValid = sum <= 1;

          if (isValid) {
            setValid?.(true);
          } else {
            setValid?.(false);
          }

          return !isValid
            ? (<Typography.Text type="danger">
              Сумма по всем узлам должна быть меньше или равна 1 (текущая: {sum.toFixed(1)})
            </Typography.Text>)
            : (<Typography.Text type='success'>
              Текущая сумма: {sum.toFixed(1)}
            </Typography.Text>);
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
          <InputNumber type='number' step={0.1} />
        </FormItem>
      ))}
    </>
  )
}