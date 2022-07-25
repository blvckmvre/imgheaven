import { PayloadAction } from "@reduxjs/toolkit";
import { logoutAction } from "../../../action-creators/auth-actions";
import { AuthState } from "../auth-slice";

export const logoutReducer = {
  [logoutAction.pending.type]: (state: AuthState) => {
    state.isLoading = true;
    state.error = null;
  },
  [logoutAction.fulfilled.type]: (state: AuthState) => {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.userData = null;
  },
  [logoutAction.rejected.type]: (
    state: AuthState,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};
