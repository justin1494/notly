import { addArticle } from "./listOfArticlesSlice";
import { addNotes } from "./listOfNotesSlice";
import { setModalHidden } from "./modalHiddenSlice";
import { notesColor, articlesColor, tweetsColor } from "./navColorSlice";
import { addNoteId, clearNoteId } from "./noteIdSlice";
import { addNoteText } from "./noteTextSlice";
import { addNoteTitle } from "./noteTitleSlice";
import { notesPage, articlesPage, tweetsPage } from "./currentPageSlice";
import { setArticleLink } from "./articleLinkSlice";

export {
  addArticle,
  addNotes,
  setModalHidden,
  notesColor,
  articlesColor,
  tweetsColor,
  addNoteId,
  clearNoteId,
  addNoteText,
  addNoteTitle,
  notesPage,
  articlesPage,
  tweetsPage,
  setArticleLink,
};
