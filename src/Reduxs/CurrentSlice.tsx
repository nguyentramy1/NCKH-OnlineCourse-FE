import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QR } from "../AxiosConfig/DataType";
interface Current {
  idCourse: string;
  currentQR: QR;
}

const initialState: Current = {
  idCourse: "",
  currentQR: {
    id: "",
    userId: "",
    userName: "",
    priceSum: 0,
    paymentStatus: 0,
    transferDescription: "",
    qrCodeUrl: "",
  },
};

const CurrentSlice = createSlice({
  name: "Current",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.idCourse = action.payload;
    },
    setCurrentQR: (state, action: PayloadAction<QR>) => {
      state.currentQR = action.payload;
    },
  },
});

export const CurrentActions = CurrentSlice.actions;
export const CurrentReducer = CurrentSlice.reducer;
