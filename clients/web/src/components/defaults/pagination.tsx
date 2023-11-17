export interface PaginatedList<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number | undefined;
  totalPages: number;
  offset: number | null;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
  pagingCounter: number | null;
  meta?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined;
}

export const listDefaultResponse = <T = any,>(): PaginatedList<T> => ({
  docs: [],
  hasNextPage: false,
  hasPrevPage: false,
  limit: 15,
  offset: 0,
  pagingCounter: 1,
  totalDocs: 0,
  totalPages: 0,
});

export interface TablePagination {
  pageNumber: number;
  pageSize: number;
}

export const tablePaginationDefault: TablePagination = {
  pageNumber: 1,
  pageSize: 10,
};
