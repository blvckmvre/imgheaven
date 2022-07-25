import { PayloadAction } from "@reduxjs/toolkit";
import { IImage } from "../../../../types/images";
import { addImage } from "../../../action-creators/image-actions";
import { ImgState } from "../image-slice";

export const addImageReducer = {
  [addImage.pending.type]: (state: ImgState) => {
    state.isLoading = true;
    state.error = null;
  },
  [addImage.fulfilled.type]: (
    state: ImgState,
    action: PayloadAction<IImage>
  ) => {
    state.images.unshift(action.payload);
    state.isLoading = false;
  },
  [addImage.rejected.type]: (
    state: ImgState,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};
