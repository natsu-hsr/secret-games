import {Button} from 'antd';
import Form, {useForm} from 'antd/es/form/Form';
import {useRef} from 'react';

import {type TypedFormData} from '@store/slices/task-slice';

import {GenericFields} from './generic-fields';
import styles from './styles.module.scss';
import {useFormControls} from './use-form-controls';

interface BaseFormProps {
  formData: TypedFormData
}
export const BaseForm: React.FC<BaseFormProps> = ({formData}) => {
  const [form] = useForm();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const {type, fields} = formData;
  const {handleSubmit} = useFormControls(form);

  const FieldsComponent = GenericFields[type]

  return (
    <div className={styles.container} ref={scrollContainerRef}>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
      >
        <FieldsComponent
          form={form}
          fields={fields}
          scrollContainerRef={scrollContainerRef}
        />
      </Form>
      <div className={styles['submit-btn-container']}>
        <Button
          className={styles['submit-btn']}
          type='primary'
          onClick={form.submit}
        >
          Сохранить данные
        </Button>
      </div>
    </div>
  )
}