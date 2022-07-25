import { PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "../../../../types/auth";
import { refreshAction } from "../../../action-creators/auth-actions";
import { AuthState } from "../auth-slice";

export const refreshReducer = {
  [refreshAction.pending.type]: (state: AuthState) => {
    state.isLoading = true;
    state.error = null;
  },
  [refreshAction.fulfilled.type]: (
    state: AuthState,
    action: PayloadAction<IProfile>
  ) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.userData = action.payload;
  },
  [refreshAction.rejected.type]: (
    state: AuthState,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};
