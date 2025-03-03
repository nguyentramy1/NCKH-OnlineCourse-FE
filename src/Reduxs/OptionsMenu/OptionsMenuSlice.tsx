import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface stateIndexOption {
  indexOption: number | null;
  indexSubOption: number | null;
}

const initialState: stateIndexOption = {
  indexOption: null,
  indexSubOption: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setIndexOption: (state, action: PayloadAction<number | null>) => {
      state.indexOption = action.payload;
    },
    setIndexSubOption: (state, action: PayloadAction<number | null>) => {
      state.indexOption = action.payload;
    },
  },
});

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
