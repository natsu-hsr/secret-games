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
        <Radio.Group
          className={styles['radio-group']}
          options={radioGroups.map(group => ({
            value: group.name,
            label: (
              <div className={styles['radio-label']}>
                {group.labels.map(label => (
                  <div key={label} className={styles['radio-label-text']}>
                    {label}
                  </div>
                ))}
              </div>
            ),
          }))}
        />
      </FormItem>    
    </>
  )
}