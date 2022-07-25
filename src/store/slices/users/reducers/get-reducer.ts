import { PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "../../../../types/auth";
import { getUser } from "../../../action-creators/user-actions";
import { UserState } from "../user-slice";

export const getUserReducer = {
  [getUser.pending.type]: (state: UserState) => {
    state.isLoading = true;
    state.error = null;
    state.user = null;
  },
  [getUser.fulfilled.type]: (state: UserState, action: PayloadAction<IProfile>) => {
    state.user = action.payload;
    state.isLoading = false;
  },
  [getUser.rejected.type]: (state: UserState, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.isLoading = false;
  }
}