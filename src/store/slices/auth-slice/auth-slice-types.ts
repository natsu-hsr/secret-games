export type TAuthForm = {
  login: string;
  password: string;
}

export type TRegisterForm = {
  email: string;
  name: string;
  surname: string;
  middlename: string;
}

export type TAuthSliceState = {
  isAuthorized: boolean;
  message?: string;
};