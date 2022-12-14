import { createSlice } from "@reduxjs/toolkit";

export const navColorSlice = createSlice({
  name: "navColor",
  initialState: {
    value: "",
  },
  reducers: {
    notesColor: (state) => {
      state.value = "bg-green-200";
    },
    articlesColor: (state) => {
      state.value = "bg-red-200";
    },
  },
});

// // Action creators are generated for each case reducer function
export const { notesColor, articlesColor } = navColorSlice.actions;

export default navColorSlice.reducer;
