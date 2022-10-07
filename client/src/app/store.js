import { configureStore } from "@reduxjs/toolkit";
import navColorSlice from "../features/navColor/navColorSlice";
import listOfNotesSlice from "../features/listOfNotes/listOfNotesSlice";

export default configureStore({
  reducer: {
    navColor: navColorSlice,
    listOfNotes: listOfNotesSlice,
  },
});
