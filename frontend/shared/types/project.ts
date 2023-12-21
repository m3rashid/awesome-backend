import { User } from './auth';
import { BaseSchema, SqlID, Time } from './base';

export type Project = BaseSchema & {
  name: string;
  description?: string;
  members?: Array<User>;
  projectOwnerId: SqlID;
  projectOwner?: User;
  completed: boolean;
};

export const taskStatuses = [
  'backlog',
  'todo',
  'inprogress',
  'review',
  'done',
] as const;
export type ProjectTask = BaseSchema & {
  projectId: SqlID;
  project?: Project;
  name: string;
  description?: string;
  deadline: Time;
  completed: boolean;
  taskStatus: (typeof taskStatuses)[number];
  reportedById: SqlID;
  reportedBy?: User;
  assignedToId: SqlID;
  assignedTo?: User;
  tags?: Array<ProjectTag>;
};

export type ProjectTag = BaseSchema & {
  name: string;
};
