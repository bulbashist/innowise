import { Theme } from "@/types/Theme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance, ColorSchemeName } from "react-native";

type State = {
  theme: Theme;
};

const settings = createSlice({
  initialState: {
    theme: Theme.Dark,
  } as State,
  name: "settings",
  reducers: {
    changeTheme: (state: State, action: PayloadAction<Theme>) => {
      Appearance.setColorScheme(action.payload as ColorSchemeName);
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = settings.actions;
export default settings.reducer;
