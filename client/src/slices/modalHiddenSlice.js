import { createSlice } from "@reduxjs/toolkit";

export const modalHiddenSlice = createSlice({
  name: "modalHidden",
  initialState: {
    value: "hidden",
  },
  reducers: {
    setModalHidden: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { setModalHidden } = modalHiddenSlice.actions;

export default modalHiddenSlice.reducer;
