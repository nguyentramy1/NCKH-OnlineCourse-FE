import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FormState {
  EditCourse: boolean;
  idEditCourse: string;
  isDelete: boolean;
  idDeleteCourse: string;
}
const initialState: FormState = {
  EditCourse: false,
  idEditCourse: "",
  isDelete: false,
  idDeleteCourse: "",
};

const FormStateSlice = createSlice({
  name: "FormState",
  initialState,
  reducers: {
    setEditCourse: (state, action: PayloadAction<boolean>) => {
      state.EditCourse = action.payload;
    },

    setidEditCourse: (state, action: PayloadAction<string>) => {
      state.idEditCourse = action.payload;
    },
    setDeleteCourse: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },

    setidDeleteCourse: (state, action: PayloadAction<string>) => {
      state.idDeleteCourse = action.payload;
    },
  },
});

export const FormStateActions = FormStateSlice.actions;
export const FormStateReducer = FormStateSlice.reducer;
