import { createSlice } from "@reduxjs/toolkit";

export const dataToDisplaySlice = createSlice({
  name: "dataToDisplay",
  initialState: {
    value: false,
  },
  reducers: {
    setDataToDisplay: (state, action) => {
      state.value = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { setDataToDisplay } = dataToDisplaySlice.actions;

export default dataToDisplaySlice.reducer;
