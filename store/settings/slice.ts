import { Theme } from "@/types/Theme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance, ColorSchemeName } from "react-native";

type State = {
  theme: Theme;
  mode: "offline" | "online";
};

const settings = createSlice({
  initialState: {
    theme: Theme.Dark,
    mode: "online",
  } as State,
  name: "settings",
  reducers: {
    changeTheme: (state: State, action: PayloadAction<Theme>) => {
      Appearance.setColorScheme(action.payload as ColorSchemeName);
      state.theme = action.payload;
    },
    changeMode: (state: State, action) => {
      state.mode = action.payload;
    },
  },
});

export const { changeTheme, changeMode } = settings.actions;
export default settings.reducer;
