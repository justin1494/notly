import { createSlice } from "@reduxjs/toolkit";

export const navColorSlice = createSlice({
  name: "navColor",
  initialState: {
    value: '"bg-green-"',
  },
  reducers: {
    notesColor: state => {
        state.value = 'bg-green-'
    },
    articlesColor: state => {
        state.value = 'bg-red-'
    },
    tweetsColor: state => {
        state.value = 'bg-blue-'
    }
  },
});

// // Action creators are generated for each case reducer function
export const { notesColor, articlesColor, tweetsColor } = navColorSlice.actions;

export default navColorSlice.reducer;
