import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IArticleRetrived,
  ICreateArticle,
  IUpdateArticle,
} from 'src/types/api';

import { QueryRoute, ReducerPath } from 'src/utils/consts';

export const articleApi = createApi({
  reducerPath: ReducerPath.ARTICLE_API,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + QueryRoute.ARTCILE,
  }),
  tagTypes: ['Article'],
  endpoints: builder => ({
    getAllArticles: builder.query<IArticleRetrived[], void>({
      query: () => ({ url: '' }),
      providesTags: ['Article'],
    }),
    createTextLabel: builder.mutation<IArticleRetrived, ICreateArticle>({
      query: body => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    updateTextLabel: builder.mutation<IArticleRetrived, IUpdateArticle>({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    removeTextLabel: builder.mutation<IArticleRetrived, string>({
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
  useCreateTextLabelMutation,
  useUpdateTextLabelMutation,
  useRemoveTextLabelMutation,
} = articleApi;
