import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface stateIndexOption {
  notifiaction: string | null;
  isShowNotice: boolean;
  notifiactionSuccess: string | null;
  isShowNoticeSuccess: boolean;
}

const initialState: stateIndexOption = {
  notifiaction: "",
  notifiactionSuccess: "",
  isShowNotice: false,
  isShowNoticeSuccess: false,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<string | null>) => {
      state.notifiaction = action.payload;
    },
    setIsShowNotice: (state, action: PayloadAction<boolean>) => {
      state.isShowNotice = action.payload;
    },
    setNotificationSuccess: (state, action: PayloadAction<string | null>) => {
      state.notifiactionSuccess = action.payload;
    },
    setIsShowNoticeSuccess: (state, action: PayloadAction<boolean>) => {
      state.isShowNoticeSuccess = action.payload;
    },
  },
});

export const noticeActions = noticeSlice.actions;
export const noticeReducer = noticeSlice.reducer;
