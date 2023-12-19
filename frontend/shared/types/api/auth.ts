import { z } from 'zod';
import { User } from '../../types/schema';

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
