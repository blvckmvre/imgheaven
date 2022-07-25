import { getImages } from "../../../action-creators/image-actions";
import { ImgState } from "../image-slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { IImage } from "../../../../types/images";

export const getImagesReducer = {
  [getImages.pending.type]: (state: ImgState) => {
    state.isLoading = true;
    state.error = null;
    state.images = [];
  },
  [getImages.fulfilled.type]: (
    state: ImgState,
    action: PayloadAction<IImage[]>
  ) => {
    state.images = action.payload;
    state.isLoading = false;
  },
  [getImages.rejected.type]: (
    state: ImgState,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};
