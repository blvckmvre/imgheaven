import { createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../../types/auth";
import { WritableDraft } from "immer/dist/internal";
import { loginReducer } from "./reducers/login-reducer";
import { logoutReducer } from "./reducers/logout-reducer";
import { refreshReducer } from "./reducers/refresh-reducer";

interface IAuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  userData: IProfile | null;
}

export type AuthState = WritableDraft<IAuthState>;

const initialState: IAuthState = {
  userData: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    ...loginReducer,
    ...logoutReducer,
    ...refreshReducer,
  },
});
