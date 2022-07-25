import { createSlice } from "@reduxjs/toolkit";
import { IImage } from "../../../types/images";
import { WritableDraft } from "immer/dist/internal";
import { addImageReducer } from "./reducers/add-reducer";
import { getImagesReducer } from "./reducers/get-reducer";
import { rmImageReducer } from "./reducers/rm-reducer";
import { likeImageReducer } from "./reducers/like-reducer";

interface IImageState {
  isLoading: boolean;
  error: string | null;
  images: IImage[];
}

export type ImgState = WritableDraft<IImageState>;

const initialState: IImageState = {
  error: null,
  images: [],
  isLoading: false
}

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: {
    ...getImagesReducer,
    ...addImageReducer,
    ...rmImageReducer,
    ...likeImageReducer
  }
})


