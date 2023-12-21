import { User } from './auth';
import { BaseSchema, SqlID } from './base';

export const driveFileType = ['folder', 'file'] as const;
export type DriveFile = BaseSchema & {
  name: string;
  type: (typeof driveFileType)[number];
  parent: number;
  resourceUrl: string;
  isFolder: boolean;
  uploadedById: SqlID;
  uploadedBy?: User;
};
