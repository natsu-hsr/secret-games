import axios from "axios";
import type {TAuthForm, TRegisterForm} from "./auth-slice-types";

export type AuthorizeArgs = TAuthForm;
export const authorize = ({login, password}: AuthorizeArgs) => {
  return axios.get(
    '/api.php',
    {
      params: {
        api_id: 'authorization',
        user_name: login,
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
        email: email,
        name: name,
        surname: surname,
        middlename: middlename,
      },
    }
  )
}