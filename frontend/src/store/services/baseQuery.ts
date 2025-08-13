/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { setToken, setUser } from "../features/authSlice";

let refreshPromise: any = null;

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:3000/api/v1",
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    // const state = getState().auth;
    // console.log(state);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    // console.log(`Bearer ${token}`);

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api: any, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log(
      "sending refresh token request",
      api?.getState().auth.refreshToken
    );
    refreshPromise = Promise.resolve(
      baseQueryWithAuth(
        {
          url: `/user/auth/refresh-token`,
          method: "POST",
          body: {
            refreshToken: api?.getState().auth.refreshToken,
          },
        },
        api,
        extraOptions
      )
    )
      .then((refreshResult: any) => {
        if (refreshResult.data) {
          if (
            refreshResult.data?.statusMessage !== "token renewal successful"
          ) {
            api.dispatch(
              setUser({ type: "auth/logout", payload: { data: {} } })
            );
            return null;
          }

          api.dispatch(
            setToken({
              type: "token/refresh",
              payload: {
                data: {
                  token: refreshResult.data.data.token,
                  refreshToken: refreshResult.data.data.refreshToken,
                },
              },
            })
          );

          return refreshResult.data;
        } else {
          api.dispatch(setUser({ type: "auth/logout", payload: { data: {} } }));

          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        api.dispatch(setUser({ type: "auth/logout", payload: { data: {} } }));
      });

    await refreshPromise;
    result = await baseQueryWithAuth(args, api, extraOptions);
  }

  return result;
};
