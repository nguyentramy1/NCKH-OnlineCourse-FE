import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Option {
  value: string;
  label: string;
  active?: boolean;
}

interface DropDataState {
  departmentOptions: Option[];
  salaryPeriodOptions: Option[];
  allsalaryPeriodOptions: Option[];
}

const initialState: DropDataState = {
  departmentOptions: [],
  salaryPeriodOptions: [],
  allsalaryPeriodOptions: [],
};

export const dropDownSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDepartmentOptions: (state, action: PayloadAction<Option[]>) => {
      state.departmentOptions = action.payload; // Lưu mảng các tùy chọn phòng ban
    },
    setSalaryPeriodOptions: (state, action: PayloadAction<Option[]>) => {
      state.salaryPeriodOptions = action.payload; // Lưu mảng các tùy chọn kỳ lương
    },
    setAllSalaryPeriodOptions: (state, action: PayloadAction<Option[]>) => {
      state.allsalaryPeriodOptions = action.payload; // Lưu mảng các tùy chọn kỳ lương
    },
  },
});

export const dropDownAction = dropDownSlice.actions;
export const dropDownReducer = dropDownSlice.reducer;
