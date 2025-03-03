import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchString: string;
}

const initialState: SearchState = {
  searchString: "",
};

const searchSliceCreateForm = createSlice({
  name: "searchCreateForm",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
    resetSearch(state) {
      state.searchString = "";
    },
  },
});

export const searchAction = searchSliceCreateForm.actions;
export default searchSliceCreateForm.reducer;
