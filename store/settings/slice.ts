import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { Theme } from "@/types";

type State = {
  theme: Theme;
  offlineMode: boolean;
};

const settings = createSlice({
  initialState: {
    theme: Theme.Dark,
    offlineMode: false,
  } as State,
  name: "settings",
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      Appearance.setColorScheme(action.payload);
      state.theme = action.payload;
    },
    changeMode: (state, action: PayloadAction<boolean>) => {
      state.offlineMode = action.payload;
    },
  },
});

export const { changeTheme, changeMode } = settings.actions;
export default settings.reducer;
