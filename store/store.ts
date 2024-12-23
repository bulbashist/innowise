import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import detailsReducer from "@/store/details/slice";
import listReducer from "@/store/list/slice";
import settingsReducer from "@/store/settings/slice";

const reducer = combineReducers({
  details: detailsReducer,
  list: listReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
