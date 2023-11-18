import { User } from '../../types/schema';

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type RegisterRequestBody = LoginRequestBody & {
  name: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type InitResponse = LoginResponse;

export type RegisterResponse = {
  message: string;
};
