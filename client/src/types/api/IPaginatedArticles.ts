import { IArticleRetrived } from '.';

export interface IPaginatedArticles {
  articles: IArticleRetrived[];
  total: number;
  totalPages: number;
}
