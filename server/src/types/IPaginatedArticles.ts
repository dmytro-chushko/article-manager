import { Article } from 'src/modules/article/entities/article.entity';

export interface IPaginatedArticles {
  articles: Article[];
  total: number;
  totalPages: number;
}
