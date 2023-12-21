import { User } from './auth';
import { BaseSchema, SqlID } from './base';

export const postStatus = ['pending', 'active'] as const;
export type Post = BaseSchema & {
  body: string;
  userId: SqlID;
  user?: User;
  toxicScore?: number;
  status: (typeof postStatus)[number];
};

export const commentStatus = ['pending', 'active'] as const;
export type Comment = BaseSchema & {
  postId: SqlID;
  post?: Post;
  body: string;
  userId: SqlID;
  user?: User;
  repliedToId: SqlID;
  repliedTo?: User;
  toxicScore: number;
  status: (typeof commentStatus)[number];
};

export type Friend = BaseSchema & {
  userId: SqlID;
  user?: User;
  friendId: SqlID;
  friend?: User;
};

export const friendRequestStatus = ['pending', 'confirmed'] as const;
export type FriendRequest = BaseSchema & {
  fromId: SqlID;
  from?: User;
  toId: SqlID;
  to?: User;
  status: (typeof friendRequestStatus)[number];
};

export type CommunityGroup = BaseSchema & {
  name: string;
  description?: string;
  createdById: SqlID;
  createdBy?: User;
  members?: Array<User>;
};

export type CommunityChatMessage = BaseSchema & {
  senderId: SqlID;
  sender?: User;
  groupId: SqlID;
  group?: CommunityGroup;
  body: string;
};
