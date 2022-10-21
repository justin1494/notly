import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: {
    value: 'notes',
  },
  reducers: {
    notesPage: state => {
        state.value = 'notes'
    },
    articlesPage: state => {
        state.value = 'articles'
    },
  },
});

// // Action creators are generated for each case reducer function
export const { notesPage, articlesPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
