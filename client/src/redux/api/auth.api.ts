import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAdminResponse, ILoginAdmin } from 'src/types/api';

import { QueryRoute, ReducerPath } from 'src/utils/consts';

export const authApi = createApi({
  reducerPath: ReducerPath.AUTH_API,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + QueryRoute.AUTH,
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    loginAdmin: builder.mutation<IAdminResponse, ILoginAdmin>({
      query: body => ({
        url: QueryRoute.LOGIN,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginAdminMutation } = authApi;
