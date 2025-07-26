import {Divider, InputNumber, Typography} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import {type FC} from 'react';

import {ExclamationCircleFilled} from '@ant-design/icons';

import styles from './styles.module.scss';
import {convertFieldsToProportions} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

export const ProportionsFields: FC<GenericFieldsProps> = ({form, fields}) => {
  const proportionsFields = convertFieldsToProportions(fields);
  const fieldNames = proportionsFields.map(pf => pf.name);

  console.log('proportionsFields=', proportionsFields);

  return (
    <>
      <Typography.Text type="secondary">
        <ExclamationCircleFilled className={styles['warning-icon']} />
        Сумма по всем узлам должна составлять 1
      </Typography.Text>
      <Divider className={styles.divider} />
      {proportionsFields?.map(pf => (
        <>
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
            initialValue={pf.defaultValue ?? 0}
            rules={[
              {
                validator: () => {
                  const vals = form.getFieldsValue(fieldNames) as Record<string, unknown>;
                  const sum = fieldNames
                    ?.map(f => f ? vals[f] : 0)
                    .reduce((acc: number, v) => {
                      if (typeof v !== 'number') {
                        return acc;
                      }
                      return acc + v;
                    }, 0);
                  if (sum !== 1) {
                    return Promise.reject(new Error('Сумма всех полей должна быть равна 1!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber type='number' step={0.1} />
          </FormItem>
        </>
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

          return sum > 1
            ? <Typography.Text type="danger">Сумма превышает 1 ({sum.toFixed(1)})</Typography.Text>
            : (<Typography.Text type={sum === 1 ? 'success' : 'secondary'}>
              Текущая сумма: {sum.toFixed(1)}
            </Typography.Text>);
        }}
      </FormItem>
    </>
  )
}