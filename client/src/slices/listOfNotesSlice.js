import { createSlice } from "@reduxjs/toolkit";

export const listOfNotesSlice = createSlice({
  name: "listOfNotes",
  initialState: {
    value: [],
  },
  reducers: {
    addNotes: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addNotes } = listOfNotesSlice.actions;

export default listOfNotesSlice.reducer;
