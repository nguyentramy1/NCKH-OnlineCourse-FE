import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  isVisible: boolean;
  message: string | null;
}

const initialState: NotificationState = {
  isVisible: false,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setMessage, setIsVisible } = notificationSlice.actions;

export const NotiFormReducer = notificationSlice.reducer;
