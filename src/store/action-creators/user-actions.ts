import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/user-service";

export const getUser = createAsyncThunk(
  "users/get",
  async (user: string, thunkAPI) => {
    try {
      const res = await UserService.getUser(user);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
