import { createSlice } from "@reduxjs/toolkit";

export const noteTitleSlice = createSlice({
  name: "noteTitle",
  initialState: {
    value: "",
  },
  reducers: {
    addNoteTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addNoteTitle } = noteTitleSlice.actions;

export default noteTitleSlice.reducer;