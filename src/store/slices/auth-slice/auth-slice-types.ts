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
  user: User | null;
  message?: string;
};

export type RawUser = {
  pass_match: 0 | 1;
  user_id: string;
  user_name: string;
}

export type User = {
  userId: string;
  username: string;
}

export type UserWithAuthorizedFlag = User & {
  isAuthorized: boolean;
}