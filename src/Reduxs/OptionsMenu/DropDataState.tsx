import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Option {
  value: string;
  label: string;
  active?: boolean;
}

interface DropDataState {
  CategoryOption: Option[];
}

const initialState: DropDataState = {
  CategoryOption: [],
};

export const DropDataSlice = createSlice({
  name: "DropDataSlice",
  initialState,
  reducers: {
    setCategoryOption: (state, action: PayloadAction<Option[]>) => {
      state.CategoryOption = action.payload; // Lưu mảng các tùy chọn phòng ban
    },
  },
});

export const DropDataAction = DropDataSlice.actions;
export const DropDataReducer = DropDataSlice.reducer;
