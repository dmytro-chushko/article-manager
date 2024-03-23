import { ICreateArticle } from './ICreateArticle';

export interface IUpdateArticle extends Partial<ICreateArticle> {
  id: string;
}
