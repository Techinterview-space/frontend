export interface PaginatedModel {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  linkPrefix: string;
}

export interface PaginatedList<T> extends PaginatedModel {
  results: Array<T>;
}
