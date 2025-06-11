import {Button, Flex, Form, Input} from 'antd';
import Card from 'antd/es/card/Card';
import {useForm} from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import CheckCircleOutlined from '@ant-design/icons/lib/icons/CheckCircleOutlined';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {register, type TRegisterForm} from '../../store/slices/auth-slice';
import type {MessageEntity} from '../../shared/types';

import styles from './register-page.module.scss';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = useForm<TRegisterForm>();

  const [message, setMessage] = useState<MessageEntity | undefined>();

  const handleSubmit = (values: TRegisterForm) => {
    register(values)
      .then(data => {
        if (data.data === '1') {
          setMessage({
            message: 'Регистрация успешна! Ожидайте письмо с инструкцией на указанный адрес',
            type: 'SUCCESS',
          });
        } else {
          setMessage({
            message: 'Во время регистрации произошла ошибка',
            type: 'ERROR',
          });
        }
      })
      .catch(() => {
        setMessage({
          message: 'Во время регистрации произошла ошибка',
          type: 'ERROR',
        });
      });
  }

  const handleChange = () => {
    if (message?.type === 'ERROR') {
      setMessage(undefined);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <Card className={styles.card}>
        {message?.type === 'SUCCESS' ? (
          <Flex vertical align='center'>
            <CheckCircleOutlined className={styles['icon-success']} />
            <Title className={styles['message-success']} level={4}>{message.message}</Title>
            <div className={styles.link} onClick={() => navigate('/login')}>
              Перейти на страницу авторизации
            </div>
          </Flex>
        ) : (
          <>
            <Title level={3} className={styles.title}>Регистрация</Title>
            <Form<TRegisterForm>
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              onValuesChange={handleChange}
            >
              <Form.Item
                label="E-mail"
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
              >
                <Input placeholder='Введите отчество' />
              </Form.Item>
              <div
                className={styles.link}
                onClick={() => navigate('/login')}
              >
                Уже есть аккаунт? Войти
              </div>
              {message?.type === 'ERROR' && <div className={styles.message}>{message?.message}</div>}
              <Button
                type="primary"
                block
                onClick={form.submit}
              >
                Зарегистрироваться
              </Button>
            </Form>
          </>
        )}
      </Card>
    </div>
  )
}
