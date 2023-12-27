import { z } from 'zod';
import { BaseSchema, SqlID } from './base';

export type User = BaseSchema & {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

export type Profile = BaseSchema & {
  userId: SqlID;
  user?: User;
};

export type UserGroup = BaseSchema & {
  groupName: string;
  description: string;
  users?: Array<User>;
};

// ********** VALIDATIONS ********** //
export const loginRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginRequestBody = z.infer<typeof loginRequestBodySchema>;

export const registerRequestBodySchema = loginRequestBodySchema.extend({
  name: z.string().min(3),
});
export type RegisterRequestBody = z.infer<typeof registerRequestBodySchema>;

export type LoginResponse = {
  user: User;
  token: string;
};

export type InitResponse = LoginResponse;

export type RegisterResponse = {
  message: string;
};
