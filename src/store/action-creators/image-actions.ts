import { createAsyncThunk } from "@reduxjs/toolkit";
import { ImageService } from "../../services/image-service";

export const getImages = createAsyncThunk(
  "images/by_user",
  async (user: string | void, thunkAPI) => {
    try {
      const res = await ImageService.getImages(user);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const addImage = createAsyncThunk(
  "images/add",
  async (url: string, thunkAPI) => {
    try {
      const res = await ImageService.addImage(url);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const rmImage = createAsyncThunk(
  "images/rm",
  async (id: number, thunkAPI) => {
    try {
      const res = await ImageService.rmImage(id);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const likeImage = createAsyncThunk(
  "images/like",
  async (id: number, thunkAPI) => {
    try {
      const res = await ImageService.likeImage(id);
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
