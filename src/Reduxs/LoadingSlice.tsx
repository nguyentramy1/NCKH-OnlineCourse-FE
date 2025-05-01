import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Loading {
  isLoading: boolean;
}

const initialState: Loading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
