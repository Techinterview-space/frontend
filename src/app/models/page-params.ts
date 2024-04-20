export interface PageParams {
  page: number;
  pageSize: number;
}

export const defaultPageParams: PageParams = {
  pageSize: 20,
  page: 1,
};
