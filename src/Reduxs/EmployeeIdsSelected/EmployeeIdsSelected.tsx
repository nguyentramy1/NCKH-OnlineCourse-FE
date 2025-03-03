import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type listIdEmployee = {
  employeeIds: string[];
};

const initialState: listIdEmployee = {
  employeeIds: [],
};

const selectedIdsEmployeeSlice = createSlice({
  name: "departIndex",
  initialState,
  reducers: {
    setEmployeeIds: (state, action: PayloadAction<string[]>) => {
      state.employeeIds = action.payload;
    },
  },
});

export const selectedIdsEmployeeActions = selectedIdsEmployeeSlice.actions;
export const selectedIdsEmployeeReducer = selectedIdsEmployeeSlice.reducer;
