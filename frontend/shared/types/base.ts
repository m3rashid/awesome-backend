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

export const defaultPaginatedResponse: PaginatedResponse<any> = {
  docs: [],
  count: 0,
  limit: 0,
  totalDocs: 0,
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};
