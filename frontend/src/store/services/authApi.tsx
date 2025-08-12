/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1",
  }),
  endpoints: (builder) => ({
    // login api call
    login: builder.mutation({
      query: (body) => {
        return {
          url: "/user/auth/login",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: any) => {
        return response.data;
      },
      transformErrorResponse: (response: any) => {
        console.log("Error", response);
        return response.data;
      },
    }),
    // signup api call
    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/user/auth/signup",
          method: "POST",
          body,
        };
      },
      transformResponse: (response) => {
        return response.data;
      },
      transformErrorResponse: (response) => {
        console.log("Error", response);
        return response.data;
      },
    }),
    // logout api call
    logout: builder.mutation({
      query: (body) => {
        return {
          url: "/user/auth/logout",
          method: "post",
          body,
        };
      },
      transformResponse: (response) => {
        return response.data;
      },
      transformErrorResponse: (response) => {
        console.log("Error", response);
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;
