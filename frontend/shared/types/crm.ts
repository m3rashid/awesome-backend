import { User } from './auth';
import { BaseSchema, SqlID, Time } from './base';

// TODO
export const leadStatus = [
  'todo',
  'in_progress',
  'done',
  'backlog',
  'blocked',
  'review',
] as const;
export type LeadStatus = (typeof leadStatus)[number];
export type Lead = BaseSchema & {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  status: (typeof leadStatus)[number];
};

// TODO
export const leadTaskStatus = ['pending', 'completed'] as const;
export type LeadTask = BaseSchema & {
  leadId: SqlID;
  lead?: Lead;
  time: Time;
  note?: string;
  status: (typeof leadTaskStatus)[number];
};

export const leadTimelineEventType = [
  'call',
  'meeting',
  'email',
  'social',
] as const;
export type LeadTimelineEvent = BaseSchema & {
  leadId: SqlID;
  lead?: Lead;
  time: Time;
  notes?: string;
  nextConnectDateTime?: Time;
  eventType?: (typeof leadTimelineEventType)[number];
  attendedById: SqlID;
  attendedBy?: User;
};

export type Campaign = BaseSchema & {
  name: string;
  description?: string;
  validTill: Time;
  validFrom: Time;
};

export type Referral = BaseSchema & {
  campaignId: SqlID;
  campaign?: Campaign;
  referrerId: SqlID;
  referrer?: User;
  description?: string;
  code: string;
  active: boolean;
  discount: number;
};
