import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../axios/config";
import { AuthService } from "../../services/auth-service";
import { IUserData } from "../../types/auth";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (code: string, thunkAPI) => {
    try {
      const res = await AuthService.login(code);
      localStorage.setItem("access", res.data.accessToken);
      return res.data.profile;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await AuthService.logout();
      localStorage.removeItem("access");
      return;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const refreshAction = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<IUserData>(baseURL + "/auth/refresh", {
        withCredentials: true,
      });
      localStorage.setItem("access", res.data.accessToken);
      return res.data.profile;
    } catch (e: any) {
      localStorage.removeItem("access");
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
