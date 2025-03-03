import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { optionType } from "../../Components/FieldDropDown/DropDownField";

export interface State {
  searchString: string;
  dropString?: optionType | null; // Kỳ lương
  departmentString?: optionType | null; // Phòng ban
  MultiDropStrings?: optionType[]; // Thay đổi thành mảng
  MultiDepartmentStrings?: optionType[]; // Thay đổi thành mảng
  currentPageIndex?: number;
  currentPageIndexST?: number;
}

const initialState: State = {
  searchString: "",
  dropString: null,
  departmentString: null, // Thêm trường cho phòng ban
  currentPageIndex: 1,
  currentPageIndexST: 1,
  MultiDropStrings: [], // Thay đổi thành mảng
  MultiDepartmentStrings: [],
};

export const searchSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, actions: PayloadAction<string>) => {
      state.searchString = actions.payload;
    },
    setFilterDrop: (state, actions: PayloadAction<optionType | null>) => {
      state.dropString = actions.payload;
    },
    setDepartmentDrop: (state, actions: PayloadAction<optionType | null>) => {
      state.departmentString = actions.payload;
    },
    setCurrentPageIndex: (state, action: PayloadAction<number>) => {
      state.currentPageIndex = action.payload;
    },
    setCurrentPageIndexST: (state, action: PayloadAction<number>) => {
      state.currentPageIndexST = action.payload;
    },
    setFilterMultiDrop: (state, actions: PayloadAction<optionType[]>) => {
      state.MultiDropStrings = actions.payload; // Cập nhật thành mảng
    },
    setMultiDepartmentDrop: (state, actions: PayloadAction<optionType[]>) => {
      state.MultiDepartmentStrings = actions.payload; // Cập nhật thành mảng
    },
  },
});

export const searchAction = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
