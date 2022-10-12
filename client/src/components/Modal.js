import React from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setModalHidden,
  addNoteTitle,
  addNoteText,
  addNotes,
  clearNoteId,
} from "../slices/slicesExport";

const Modal = () => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  let link;

  if (currentPath === "articles") {
    link = `https://google.pl`;
  }

  const modalHidden = useSelector((state) => state.modalHidden.value);
  const navColor = useSelector((state) => state.navColor.value);
  const noteTitle = useSelector((state) => state.noteTitle.value);
  const noteText = useSelector((state) => state.noteText.value);
  const noteId = useSelector((state) => state.noteId.value);
  const dispatch = useDispatch();

  // refs
  const inputTitleRef = React.useRef();
  const inputTextRef = React.useRef();

  const handleNotesUpdate = () => {
    Axios.get(`http://localhost:3001/${currentPath}`).then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  };

  const createNote = (link) => {
    Axios.post(`http://localhost:3001/${currentPath}`, {
      title: noteTitle,
      text: noteText,
      link,
    }).then(() => handleNotesUpdate());
  };

  const updateNote = () => {
    Axios.patch(`http://localhost:3001/${currentPath}/${noteId}`, {
      title: inputTitleRef.current.value,
      text: inputTextRef.current.value,
    }).then(() => handleNotesUpdate());
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
          {noteId === "" ? (
            <button
              onClick={() => {
                createNote(link);
                dispatch(setModalHidden("hidden"));
                handleModalInputClear();
                dispatch(clearNoteId());
              }}>
              Create Note
            </button>
          ) : (
            <button
              onClick={() => {
                updateNote();
                dispatch(setModalHidden("hidden"));
                handleModalInputClear();
                dispatch(clearNoteId());
              }}>
              Update Note
            </button>
          )}
        </div>
        <button
          className="absolute top-2 right-5"
          onClick={() => {
            dispatch(setModalHidden("hidden"));
            handleModalInputClear();
            dispatch(clearNoteId());
          }}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
