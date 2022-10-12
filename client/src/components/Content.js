import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addNotes } from "../slices/listOfNotesSlice";
import { addNoteTitle } from "../slices/noteTitleSlice";
import { addNoteText } from "../slices/noteTextSlice";
import { addNoteId } from "../slices/noteIdSlice";
import { setModalHidden } from "../slices/modalHiddenSlice";

const Note = () => {
  const listOfNotes = useSelector((state) => state.listOfNotes.value);
  const dispatch = useDispatch();

  const handleNotesUpdate = () => {
    Axios.get("http://localhost:3001/notes").then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  };

  useEffect(() => {
    handleNotesUpdate();
  }, []);

  const deleteNote = (noteId) => {
    Axios.delete(`http://localhost:3001/notes/${noteId}`).then(() =>
      handleNotesUpdate()
    );
  };

  const showModalHandler = () => {
    dispatch(setModalHidden(""));
  };

  return (
    <>
      <div className="flex justify-start items-start gap-10 flex-wrap">
        {listOfNotes.map((note) => {
          return (
            <div
              className="w-48 max-h-fit bg-orange-200 rounded-md overflow-hidden"
              data-id={note._id}>
              <h2 className="flex justify-center p-2 text-md font-bold bg-green-200">
                {note.title}
              </h2>
              <p className="p-5">{note.text}</p>
              <button
                onClick={(e) => {
                  deleteNote(e.target.parentElement.getAttribute("data-id"));
                }}>
                X
              </button>
              <button
                onClick={(e) => {
                  dispatch(
                    addNoteId(e.target.parentElement.getAttribute("data-id"))
                  );
                  dispatch(
                    addNoteTitle(e.target.parentElement.children[0].innerText)
                  );
                  dispatch(
                    addNoteText(e.target.parentElement.children[1].innerText)
                  );
                  showModalHandler();
                }}>
                Edit
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-48 flex gap-10">
        <button
          className="text-white"
          onClick={() => {
            showModalHandler();
            dispatch(addNoteTitle(""));
            dispatch(addNoteText(""));
          }}>
          Create new note
        </button>
      </div>
    </>
  );
};

export default Note;
