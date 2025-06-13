import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import Card from 'antd/es/card/Card';
import {Navigate, useNavigate} from 'react-router-dom';

import {
  type TAuthForm,
  authorize,
  authSliceActions,
  selectAuthMessage,
  selectAuthorizedStatus,
} from '@store/slices/auth-slice';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';

import styles from './login-page.module.scss';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthorized = useAppSelector(selectAuthorizedStatus);
  const message = useAppSelector(selectAuthMessage);

  const [form] = useForm<TAuthForm>();

  const handleSubmit = (values: TAuthForm) => {
    dispatch(authorize(values));
  }

  const handleChange = () => {
    dispatch(authSliceActions.resetMessage());
  }

  if (isAuthorized) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>Вход в систему</Title>
        <Form<TAuthForm>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[{required: true, message: 'Необходимо ввести логин'}]}
          >
            <Input placeholder='Введите логин' />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{required: true, message: 'Необходимо ввести пароль'}]}
          >
            <Input.Password placeholder='Введите пароль' />
          </Form.Item>
          <div
            className={styles.link}
            onClick={() => navigate('/register')}
          >
            Нет аккаунта? Зарегистрироваться
          </div>
          {!!message && <div className={styles.message}>{message}</div>}
          <Button
            type="primary"
            block
            onClick={form.submit}
          >
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  )
}
