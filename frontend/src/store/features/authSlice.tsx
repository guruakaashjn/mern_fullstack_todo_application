/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
  targetUserID: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // setting users and storing user info with token in localstorage and setting isAuthenticated to true for enabling access to protected routes
      if (action?.payload?.type === "auth/login") {
        state.user = action.payload.payload.data;
        state.token = action.payload.payload.data.token;
        state.refreshToken = action.payload.payload.data.refreshToken;
        state.isAuthenticated = true;
      }

      // clearing user data and setting isAuthenticated to false
      if (action?.payload?.type === "auth/logout") {
        console.log("here");
        state.isAuthenticated = false;
      }
    },

    setToken: (state, action) => {
      if (action?.payload?.type === "token/refresh") {
        state.token = action.payload.payload.data.token;
        state.refreshToken = action.payload.payload.data.refreshToken;
      }
    },
  },
});

export const selectAuth = (state: any) => state.auth;

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
