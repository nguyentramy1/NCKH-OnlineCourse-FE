import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { searchReducer } from "./Reduxs/FilterTable/SearchSlice";
import { authReducer } from "./Reduxs/Auth/AuthSlice";
import { menuReducer } from "./Reduxs/OptionsMenu/OptionsMenuSlice";
import searchCreateFormReducer from "./Reduxs/FilterTable/searchSliceCreateForm";
import { noticeReducer } from "./Reduxs/Notification/Notification";
import { NotiFormReducer } from "./Reduxs/NotiForm/NotificationSlice";
import { dropDownReducer } from "./Reduxs/FilterTable/DropDownSlice";
import { profileReducer } from "./Reduxs/UserInfor/ProfileSlice";
import { loadingReducer } from "./Reduxs/LoadingSlice";
import { DropDataReducer } from "./Reduxs/OptionsMenu/DropDataState";
import { FormStateReducer } from "./Reduxs/FormState/FormStateSlice";
import { CurrentCourseReducer } from "./Reduxs/CurrentCourseSlice";
export const store = configureStore({
  reducer: {
    searchStore: searchReducer,
    authStore: authReducer,
    menuStore: menuReducer,
    searchCreateForm: searchCreateFormReducer,
    noticeStore: noticeReducer,
    dropData: dropDownReducer,
    NotiFormStore: NotiFormReducer,
    ProfileStore: profileReducer,
    loadingStore: loadingReducer,
    DropDataStore: DropDataReducer,
    FormStateStore: FormStateReducer,
    CurrentCourseStore: CurrentCourseReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
