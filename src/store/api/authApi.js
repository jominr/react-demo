import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1/api/',
  }),
  endpoints(build) {
    return {
      register: build.mutation({
        query(user) {
          return {
            url: 'auth/register',
            method: 'post',
            body: user, // username, email, psd
          }
        }
      }),
      login: build.mutation({
        query(user) {
          return {
            url: 'auth/login',
            method: 'post',
            body: user, // username, psd
          }
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data;
        },
      }),
    }
  }
})

export const { useRegisterMutation, useLoginMutation } = authApi;