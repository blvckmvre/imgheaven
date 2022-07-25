import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/auth-slice";
import { imageSlice } from "./slices/images/image-slice";
import { userSlice } from "./slices/users/user-slice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [imageSlice.name]: imageSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;
