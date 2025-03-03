import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInfor, DataLoginType } from "../../AxiosConfig/DataType";

const initialState: AuthInfor = {
  isAuth: false,
  info: null,
  role:""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setInfo: (state, action: PayloadAction<DataLoginType | null>) => {
      state.info = action.payload;
    },
    setRole: (state, action: PayloadAction<string | "">) => {
      state.role = action.payload;
    },
  
   
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
