import { createSlice } from "@reduxjs/toolkit";

export const noteIdSlice = createSlice({
  name: "noteId",
  initialState: {
    value: "id notatki",
  },
  reducers: {
    addNoteId: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addNoteId } = noteIdSlice.actions;

export default noteIdSlice.reducer;