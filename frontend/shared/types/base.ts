export type SqlID = number;
export type Time = Date;

export type BaseSchema = {
  id: SqlID;
  deleted: boolean;
  createdAt: Time;
};
