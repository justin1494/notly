import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalHidden,
  addNoteTitle,
  addNoteText,
  addNotes,
} from "../slices/slicesExport";

const Modal = () => {
  const modalHidden = useSelector((state) => state.modalHidden.value);
  const navColor = useSelector((state) => state.navColor.value);
  const noteTitle = useSelector((state) => state.noteTitle.value);
  const noteText = useSelector((state) => state.noteText.value);
  const dispatch = useDispatch();

  // refs
  const inputTitleRef = React.useRef();
  const inputTextRef = React.useRef();

  const createNote = () => {
    Axios.post("http://localhost:3001/notes", {
      title: noteTitle,
      text: noteText,
    }).then(() => handleNotesUpdate());
  };

  // const updateNote = () => {
  //   Axios.patch(`http://localhost:3001/notes/${noteId}`, {
  //     title: inputTitleRef.current.value,
  //   }).then(() => handleNotesUpdate());
  // };

  const handleNotesUpdate = () => {
    Axios.get("http://localhost:3001/notes").then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  };

  const handleModalInputClear = () => {
    inputTextRef.current.value = "";
    inputTitleRef.current.value = "";
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
            ref={inputTitleRef}
            value={noteTitle}
            onChange={(e) => {
              dispatch(addNoteTitle(e.target.value));
            }}
          />
          <textarea
            type="text"
            placeholder="Note Text..."
            ref={inputTextRef}
            value={noteText}
            onChange={(e) => {
              dispatch(addNoteText(e.target.value));
            }}
          />
          <button
            onClick={() => {
              createNote();
              dispatch(setModalHidden("hidden"));
              handleModalInputClear();
            }}>
            Create Note
          </button>
        </div>
        <button
          className="absolute top-2 right-5"
          onClick={() => {
            dispatch(setModalHidden("hidden"));
            handleModalInputClear();
          }}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
