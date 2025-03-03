import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../AxiosConfig/DataType";

const initialState: Profile = {
  unique_name: "",
  userId: "",
};

const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUnique_name: (state, action: PayloadAction<string>) => {
      state.unique_name = action.payload;
    },
    
   
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
