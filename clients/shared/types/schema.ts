export type ActionLog = {
  _id: string;
  time: Date;
};

export type BaseSchema = {
  _id: string;
  deleted: boolean;
  createdBy: ActionLog;
  updatedBy: ActionLog[];
};

export type User = BaseSchema & {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  deactivated: boolean;
  password: string;
  roles: Array<UserGroup | string>;
  profile: string;
};

export type Profile = BaseSchema & {};

export type UserGroup = BaseSchema & {
  groupName: string;
  description: string;
  users: Array<User | string>;
};

export type Permission = {
  _id: string;
  user: string;
  relation: string;
  object: string;
};
