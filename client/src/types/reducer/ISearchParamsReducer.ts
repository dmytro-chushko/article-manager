import { SortParams } from 'src/utils/consts';

export interface ISearchParamsReducer {
  search: string;
  sort: SortParams;
  page: number;
  limit: number;
}
