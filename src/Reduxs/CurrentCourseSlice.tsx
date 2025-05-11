import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CurrentCourse {
  idCourse: string;
}

const initialState: CurrentCourse = {
  idCourse: "",
};

const CurrentCourseSlice = createSlice({
  name: "CurrentCourse",
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<string>) => {
      state.idCourse = action.payload;
    },
  },
});

export const CurrentCourseActions = CurrentCourseSlice.actions;
export const CurrentCourseReducer = CurrentCourseSlice.reducer;
