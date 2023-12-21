import { BaseSchema, SqlID } from './base';
import { User } from './auth';

export type Form = BaseSchema & {
  title: string;
  description?: string;
  jsonSchema: Record<string, any>;
  createdById: SqlID;
  createdBy?: User;
  authRequired: boolean;
  visits: number;
  shareId: string;
  published: boolean;
};

export type Response = BaseSchema & {
  formId: SqlID;
  form?: Form;
  responseData: Record<string, string>;
  userId: SqlID;
  user?: User;
};
