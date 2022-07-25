import { PayloadAction } from "@reduxjs/toolkit";
import { likeImage } from "../../../action-creators/image-actions";
import { ImgState } from "../image-slice";

export const likeImageReducer = {
  [likeImage.pending.type]: (state: ImgState) => {
    state.isLoading = true;
    state.error = null;
  },
  [likeImage.fulfilled.type]: (
    state: ImgState,
    action: PayloadAction<{ id: number; likes: string[] }>
  ) => {
    const i = state.images.findIndex((image) => image.id === action.payload.id);
    state.images[i].likes = action.payload.likes;
    state.isLoading = false;
  },
  [likeImage.rejected.type]: (
    state: ImgState,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};
