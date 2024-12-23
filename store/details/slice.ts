import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  data: Character | null;
};

const fetchCharacter = createAsyncThunk(
  "fetch-character",
  async (id: number) => {
    return CharacterAPI.getOne(id);
  }
);

const details = createSlice({
  initialState: {
    data: null,
  } as State,
  name: "details",
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      fetchCharacter.fulfilled,
      (state, action: PayloadAction<Character>) => {
        state.data = action.payload;
      }
    ),
});

export { fetchCharacter };
export default details.reducer;
