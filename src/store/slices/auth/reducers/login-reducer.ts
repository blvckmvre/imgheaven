import { PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "../../../../types/auth";
import { loginAction } from "../../../action-creators/auth-actions";
import { AuthState } from "../auth-slice";

export const loginReducer = {
  [loginAction.pending.type]: (state: AuthState) => {
    state.isLoading = true;
    state.error = null;
  },
  [loginAction.fulfilled.type]: (
    state: AuthState,
    action: PayloadAction<IProfile>
  ) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.userData = action.payload;
  },
  [loginAction.rejected.type]: (
    state: AuthState,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};
