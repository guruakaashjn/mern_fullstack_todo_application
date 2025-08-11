/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRejectedWithValue } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */

export const rtkQueryErrorLogger =
  (api: any) => (next: any) => (action: any) => {
    //RTK Query users `createAsyncThunk` from redux-toolkit unser the hood, so we're able to utilize these matchers!
    console.log(api);
    if (isRejectedWithValue(action)) {
      if (
        action.payload?.message === "jwt expired" ||
        action.payload?.message === "Invalid Token"
      ) {
        console.log("change state here");
      }
      console.log("We got a rejected action!");
    }

    return next(action);
  };
