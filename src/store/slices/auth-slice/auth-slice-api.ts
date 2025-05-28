import axios from "axios";
import type {TAuthForm} from "./auth-slice-types";

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