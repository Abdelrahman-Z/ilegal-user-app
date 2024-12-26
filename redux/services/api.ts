import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com' }), // Replace with your API base URL
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login', // Replace with your login endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation({
        query: (email) => ({
          url: '/user/auth/forget-password', // Replace with your forget password endpoint
          method: 'POST',
          body: email,
        }),
      }),
    // Add other endpoints here
  }),
});

export const { useLoginMutation  , useForgetPasswordMutation} = api;
