export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  name: string;
  email: string;
  token: string;
};
export type CurrentUser = {
  name: string;
  email: string;
};
