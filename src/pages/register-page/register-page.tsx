import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';

import Card from 'antd/es/card/Card';
import {authSliceActions, selectAuthMessage, type TRegisterForm} from '../../store/slices/auth-slice';

import styles from './register-page.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/config/hooks';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm<TRegisterForm>();

  const message = useAppSelector(selectAuthMessage);

  const handleSubmit = (values: TRegisterForm) => {
    console.log('submitted values=', values);
  }

  const handleChange = () => {
    dispatch(authSliceActions.resetMessage());
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>Регистрация</Title>
        <Form<TRegisterForm>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
        >
          <Form.Item
            label="Почтовый адрес"
            name="email"
            rules={[{required: true, message: 'Необходимо ввести почтовый адрес'}]}
          >
            <Input type='email' placeholder='Введите почтовый адрес' />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="surname"
            rules={[{required: true, message: 'Необходимо ввести фамилию'}]}
          >
            <Input placeholder='Введите фимилию' />
          </Form.Item>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{required: true, message: 'Необходимо ввести имя'}]}
          >
            <Input placeholder='Введите имя' />
          </Form.Item>
          <Form.Item
            label="Отчество"
            name="middlename"
            rules={[{required: true, message: 'Необходимо ввести отчество'}]}
          >
            <Input placeholder='Введите отчество' />
          </Form.Item>
          <div
            className={styles.link}
            onClick={() => navigate('/login')}
          >
            Уже есть аккаунт? Войти
          </div>
          {!!message && <div className={styles.message}>{message}</div>}
          <Button
            type="primary"
            block
            onClick={form.submit}
          >
            Зарегистрироваться
          </Button>
        </Form>
      </Card>
    </div>
  )
}
