import { BaseSchema } from './base';
import { DriveFile } from './driveFile';

export type Email = BaseSchema & {
  from: string;
  to: string;
  subject: string;
  bodyText: string;
  bodyHTML: string;
  attachments?: Array<DriveFile>;
  replyTo?: string;
};
