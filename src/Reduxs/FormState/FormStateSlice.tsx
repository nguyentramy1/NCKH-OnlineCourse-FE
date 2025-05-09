import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FormState {
  EditCourse: boolean;
  idEditCourse: string;
}
const initialState: FormState = {
  EditCourse: false,
  idEditCourse: "",
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
  },
});

export const FormStateActions = FormStateSlice.actions;
export const FormStateReducer = FormStateSlice.reducer;
