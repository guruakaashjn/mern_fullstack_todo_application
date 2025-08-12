/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const todoEntryApi = createApi({
  reducerPath: "todoEntryApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // create todo entry
    createTodoEntry: builder.mutation({
      query: (body) => {
        return {
          url: "/todo",
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

    // update todo entry
    updateTodoEntry: builder.mutation({
      query: (todoEntryObject) => {
        return {
          url: `/todo/${todoEntryObject.id}`,
          method: "PUT",
          body: todoEntryObject.body,
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

    // delete todo entry
    deleteTodoEntry: builder.mutation({
      query: (todoEntryId) => {
        return {
          url: `/todo/${todoEntryId}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        console.log("Error", response);
        return response;
      },
    }),

    // get todo entry by id
    getTodoEntryById: builder.mutation({
      query: (todoEntryObject) => {
        return {
          url: `/todo/${todoEntryObject.id}`,
          method: "GET",
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

    // get all todo entries
    getAllTodoEntries: builder.mutation({
      query: (body) => {
        return {
          url: "/todo",
          method: "GET",
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

    // enable/disable
    enableDisableTodoEntry: builder.mutation({
      query: (todoEntryObject) => {
        return {
          url: `/todo/${todoEntryObject.id}/enable-status`,
          method: "PATCH",
          body: todoEntryObject.body,
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
  }),
});

export const {
  useCreateTodoEntryMutation,
  useUpdateTodoEntryMutation,
  useDeleteTodoEntryMutation,
  useGetTodoEntryByIdMutation,
  useGetAllTodoEntriesMutation,
  useEnableDisableTodoEntryMutation,
} = todoEntryApi;
