import {Radio} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import type {FC} from 'react';

import styles from './styles.module.scss';
import {convertFieldsToRadios} from './utils';
import type {GenericFormProps} from '../../generic-form';


export const RadioForm: FC<GenericFormProps> = ({
  classNames, fields
}) => {
  const [form] = useForm();
  const radioGroups =  convertFieldsToRadios({fields});
  const checkedValueName = radioGroups.find(group => group.checked)?.name ?? '';
  
  const {wrapperClassName} = classNames ?? {};

  return (
    <Form
      className={wrapperClassName}
      form={form}
      layout='vertical'
      // onFinish={handleFormSubmit}
    >
      <FormItem
        name="radioValue"
      >
        <Radio.Group
          className={styles['radio-group']}
          defaultValue={checkedValueName}
          options={radioGroups.map(group => ({
            value: group.name,
            label: (
              <div
                className={styles['radio-label']}
              >
                {group.labels.map(label => (
                  <div
                    key={label}
                    className={styles['radio-label-text']}
                  >
                    {label}
                  </div>
                ))}
              </div>
            ),
          }))}
        />
      </FormItem>    
    </Form>
  )
}