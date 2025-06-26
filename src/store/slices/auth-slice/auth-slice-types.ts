export type TAuthForm = {
  email: string;
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

export type User = {
  userId: string;
}