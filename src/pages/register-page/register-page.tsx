import {Button, Form, Input, notification} from 'antd';
import Card from 'antd/es/card/Card';
import {useForm} from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom';

import {authSliceActions, register, selectAuthMessage, type TRegisterForm} from '../../store/slices/auth-slice';
import {useAppDispatch, useAppSelector} from '../../store/config/hooks';

import styles from './register-page.module.scss';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm<TRegisterForm>();

  const message = useAppSelector(selectAuthMessage);

  const handleSubmit = (values: TRegisterForm) => {
    register(values)
      .then(data => {
        if (data.data === '1') {
          notification.success({message: 'Регистрация успешна, ожидайте письмо с инструкцией на указанный адрес', duration: 3})
        } else {
          notification.error({message: 'Во время регистрации произошла ошибка', duration: 3})
        }
      })
      .catch(() => notification.error({message: 'Во время регистрации произошла ошибка', duration: 3}));
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
            rules={[{required: true, type: "email", message: 'Необходимо ввести корректный почтовый адрес'}]}
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
