import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IArticleRetrived,
  ICreateArticle,
  IPaginatedArticles,
  IUpdateArticle,
} from 'src/types/api';

import { QueryRoute, ReducerPath } from 'src/utils/consts';

export const articleApi = createApi({
  reducerPath: ReducerPath.ARTICLE_API,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + QueryRoute.ARTCILE,
    credentials: 'include',
  }),
  tagTypes: ['Article'],
  endpoints: builder => ({
    getAllArticles: builder.query<IPaginatedArticles, void>({
      query: () => ({ url: '?search=the&sort=ASC&page=1&limit=10' }),
      providesTags: ['Article'],
    }),
    createArticle: builder.mutation<IArticleRetrived, ICreateArticle>({
      query: body => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation<IArticleRetrived, IUpdateArticle>({
      query: ({ id, data }) => ({
        url: id,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Article'],
    }),
    removeArticle: builder.mutation<IArticleRetrived, string>({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useRemoveArticleMutation,
} = articleApi;
