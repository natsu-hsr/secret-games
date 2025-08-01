import axios from 'axios';

import type {RawUser, TAuthForm, TRegisterForm} from './auth-slice-types';

// TODO: на бэке костыль с RawUser[], должен приходить просто объект
export type AuthorizeArgs = TAuthForm;
export const authorize = ({email, password}: AuthorizeArgs) => {
  return axios.get<RawUser[]>(
    '/api.php',
    {
      params: {
        api_id: 'authorization',
        user_email: email,
        user_pwd: password,
      },
    }
  )
}

export type RegisterArgs = TRegisterForm;
export const register = ({email, name, surname, middlename}: TRegisterForm) => {
  return axios.get(
    '/api.php',
    {
      params: {
        api_id: 'registration',
        user_email: email,
        user_name: name,
        user_middlename: middlename,
        user_surname: surname,
      },
    }
  )
}