import { createSlice } from "@reduxjs/toolkit";

export const noteTextSlice = createSlice({
  name: "noteText",
  initialState: {
    value: "tekst notatki",
  },
  reducers: {
    addNoteText: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addNoteText } = noteTextSlice.actions;

export default noteTextSlice.reducer;