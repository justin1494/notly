import React from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setModalHidden } from "../slices/modalHiddenSlice";
import { addNoteTitle } from "../slices/noteTitleSlice";
import { addNoteText } from "../slices/noteTextSlice";
import { addNotes } from "../slices/listOfNotesSlice";

const Modal = () => {
  const modalHidden = useSelector((state) => state.modalHidden.value);
  const navColor = useSelector((state) => state.navColor.value);
  const noteTitle = useSelector((state) => state.noteTitle.value);
  const noteText = useSelector((state) => state.noteText.value);
  const dispatch = useDispatch();

  const createNote = () => {
    Axios.post("http://localhost:3001/notes", {
      title: noteTitle,
      text: noteText,
    }).then(() => handleNotesUpdate());
  };

  const handleNotesUpdate = () => {
    Axios.get("http://localhost:3001/notes").then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  };

  return (
    <div
      className={`${modalHidden} absolute flex justify-center items-center left-0 top-0 h-full w-full pl-28 bg-black/50`}>
      <div className={`relative h-1/4 w-96 ${navColor}`}>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <p>Make new note</p>
          <input
            type="text"
            placeholder="Note Title..."
            onChange={(e) => {
              dispatch(addNoteTitle(e.target.value));
            }}
          />
          <textarea
            type="text"
            placeholder="Note Text..."
            onChange={(e) => {
              dispatch(addNoteText(e.target.value));
            }}
          />
          <button
            onClick={() => {
              createNote();
              dispatch(setModalHidden("hidden"));
            }}>
            Create Note
          </button>
        </div>
        <button
          className="absolute top-2 right-5"
          onClick={() => {
            dispatch(setModalHidden("hidden"));
          }}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
