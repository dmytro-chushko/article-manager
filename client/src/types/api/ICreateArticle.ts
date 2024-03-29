type CreateFormFields =
  | 'title'
  | 'description'
  | 'image'
  | 'link'
  | 'creator[0]';

export interface ICreateArticle extends FormData {
  append(name: CreateFormFields, value: string | Blob, fileName?: string): void;
}
