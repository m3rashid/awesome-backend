export type SqlID = number;

export type ActionLog = {
  id: SqlID;
  time: Date;
  userId: SqlID;
  action: 'create' | 'update' | 'delete';
  objectId: string;
};

export type BaseSchema = {
  id: SqlID;
  deleted: boolean;
};

export type User = BaseSchema & {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  deactivated: boolean;
  password: string;
  roles: Array<UserGroup | SqlID>;
  profile: SqlID;
};

export type Profile = BaseSchema & {};

export type UserGroup = BaseSchema & {
  groupName: string;
  description: string;
  users: Array<User | SqlID>;
};

export type Permission = {
  id: SqlID;
  user: SqlID;
  relation: string;
  object: SqlID;
  isUserGroup: boolean;
  isObjectGroup: boolean;
};

export type File = BaseSchema & {
  name: string;
  type: string;
  parent: string;
  resourceUrl: string;
  isFolder: boolean;
};

export type Resource = {
  id: SqlID;
  name: string;
  description: string;
  resourceType: string;
  resourceId: SqlID;
};
