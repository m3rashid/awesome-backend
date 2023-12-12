export type ServerActionType = 'logout' | 'no_action';

export type ClientActionTypes = 'community_chat_message';

export type ServerToClientMessageFormat = {
  data: any;
  actionType: ServerActionType;
};

export type ClientToServerMessageFormat = {
  token: string;
  data: any;
  actionType: ClientActionTypes;
};
