import { configureStore } from "@reduxjs/toolkit";
import navColorSlice from "../slices/navColorSlice";
import listOfNotesSlice from "../slices/listOfNotesSlice";
import listOfArticlesSlice from "../slices/listOfArticlesSlice";
import noteTitleSlice from "../slices/noteTitleSlice";
import noteTextSlice from "../slices/noteTextSlice";
import noteIdSlice from "../slices/noteIdSlice";
import modalHiddenSlice from "../slices/modalHiddenSlice";

export default configureStore({
  reducer: {
    navColor: navColorSlice,
    listOfNotes: listOfNotesSlice,
    listOfArticles: listOfArticlesSlice,
    noteTitle: noteTitleSlice,
    noteText: noteTextSlice,
    noteId: noteIdSlice,
    modalHidden: modalHiddenSlice,
  },
});
