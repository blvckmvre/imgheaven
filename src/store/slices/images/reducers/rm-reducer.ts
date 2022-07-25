import { PayloadAction } from "@reduxjs/toolkit";
import { rmImage } from "../../../action-creators/image-actions";
import { ImgState } from "../image-slice";

export const rmImageReducer = {
  [rmImage.pending.type]: (state: ImgState) => {
    state.isLoading = true;
    state.error = null;
  },
  [rmImage.fulfilled.type]: (
    state: ImgState,
    action: PayloadAction<number>
  ) => {
    state.isLoading = false;
    state.images = state.images.filter((image) => image.id !== action.payload);
  },
  [rmImage.rejected.type]: (state: ImgState, action: PayloadAction<string>) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};
