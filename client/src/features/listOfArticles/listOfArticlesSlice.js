import { createSlice } from "@reduxjs/toolkit";

export const listOfArticlesSlice = createSlice({
  name: "listOfNotes",
  initialState: {
    value: [
      {
        title: "tytuł stockowej notatki",
        text: "tekst stokowego artykułu",
        link: "goodle.pl",
      },
    ],
  },
  reducers: {
    addArticle: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addArticle } = listOfArticlesSlice.actions;

export default listOfArticlesSlice.reducer;
