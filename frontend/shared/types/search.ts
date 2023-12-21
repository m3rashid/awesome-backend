import { SqlID, Time } from './base';

export const actionLogActions = ['create', 'update', 'delete'] as const;
export type ActionLog = {
  id: SqlID;
  time: Time;
  userId: SqlID;
  action: (typeof actionLogActions)[number];
  objectId: SqlID;
};

export const resourceTypes = [
  'users',
  'posts',
  'forms',
  'projects',
  'community_groups',
] as const;
export type Resource = {
  id: SqlID;
  name: string;
  description?: string;
  resourceId: SqlID;
  resourceType: (typeof resourceTypes)[number];
};
