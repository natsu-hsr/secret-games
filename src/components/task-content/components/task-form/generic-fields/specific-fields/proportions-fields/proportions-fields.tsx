import {Divider, InputNumber, Typography} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import  {type FC} from 'react';

import {ExclamationCircleFilled} from '@ant-design/icons';

import styles from './styles.module.scss';
import {convertFieldsToProportions} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

export const ProportionsFields: FC<GenericFieldsProps> = ({form, fields, setValid}) => {
  const proportionsFields = convertFieldsToProportions(fields);

  return (
    <>
      <Typography.Text type="secondary">
        <ExclamationCircleFilled className={styles['warning-icon']} />
        Сумма по всем узлам должна составлять 1
      </Typography.Text>
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
      {/* Суммарная подсказка */}
      <FormItem shouldUpdate>
        {() => {
          const vals: Record<string, unknown> = form.getFieldsValue();
          const sum: number = Object.values(vals)
          .reduce((s: number, v: unknown) => {
            if (typeof v !== 'number') {
              return s;
            }
            return s + v;
          }, 0);

          const isValid = sum === 1;

          if (isValid) {
            setValid?.(true);
          } else {
            setValid?.(false);
          }

          return !isValid
            ? (<Typography.Text type="danger">
              Сумма по всем узлам должна быть равна 1 (текущая: {sum.toFixed(1)})
            </Typography.Text>)
            : (<Typography.Text type='success'>
              Текущая сумма: {sum.toFixed(1)}
            </Typography.Text>);
        }}
      </FormItem>
    </>
  )
}