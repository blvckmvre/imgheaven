import { createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../../types/auth";
import { WritableDraft } from "immer/dist/internal";
import { getUserReducer } from "./reducers/get-reducer";

interface IUserState {
  isLoading: boolean;
  error: string | null;
  user: IProfile | null;
}

export type UserState = WritableDraft<IUserState>;

const initialState: IUserState = {
  isLoading: false,
  error: null,
  user: null
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    ...getUserReducer
  }
})