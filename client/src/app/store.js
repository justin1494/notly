import { configureStore } from "@reduxjs/toolkit";
import navColorSlice from "../features/navColor/navColorSlice";
import listOfNotesSlice from "../features/listOfNotes/listOfNotesSlice";
import listOfArticlesSlice from "../features/listOfArticles/listOfArticlesSlice";

export default configureStore({
  reducer: {
    navColor: navColorSlice,
    listOfNotes: listOfNotesSlice,
    listOfArticles: listOfArticlesSlice,
  },
});
