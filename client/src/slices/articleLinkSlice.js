import { createSlice } from "@reduxjs/toolkit";

export const articleLinkSlice = createSlice({
  name: "articleLink",
  initialState: {
    value: "google.pl",
  },
  reducers: {
    setArticleLink: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { setArticleLink } = articleLinkSlice.actions;

export default articleLinkSlice.reducer;
