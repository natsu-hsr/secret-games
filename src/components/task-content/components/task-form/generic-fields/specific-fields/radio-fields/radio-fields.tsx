import {Radio} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import type {FC} from 'react';

import styles from './styles.module.scss';
import {convertFieldsToRadios} from './utils';
import type {GenericFieldsProps} from '../../generic-fields';

export const RadioFields: FC<GenericFieldsProps> = ({fields}) => {
  const radioGroups =  convertFieldsToRadios({fields});
  const checkedValueName = radioGroups.find(group => group.checked)?.name ?? '';

  return (
    <>
      <FormItem
        name="radioValue"
        initialValue={checkedValueName}
      >
        <Radio.Group className={styles['radio-group']}>
          {radioGroups.map(group => (
            <Radio
              key={group.name}
              value={group.name}
              className={styles.radio}
              disabled={group.disabled}
            >
              <div className={styles['label-wrapper']}>
                {group.labels.map((label, idx) => (
                  <div key={idx} className={styles.label}>
                    {label};
                  </div>
                ))}
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </FormItem>    
    </>
  )
}