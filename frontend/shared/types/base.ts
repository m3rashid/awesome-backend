export type SqlID = number;
export type Time = Date;

export type BaseSchema = {
  id: SqlID;
  deleted: boolean;
  createdAt: Time;
};

export type PaginatedResponse<T> = {
  docs: T[];
  count: number;
  limit: number;
  totalDocs: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
