import { ICreateArticle } from './ICreateArticle';

export interface IUpdateArticle extends Partial<ICreateArticle> {
  data: ICreateArticle;
  id: string;
}
