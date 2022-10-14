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
  setArticleLink,
} from "../slices/slicesExport";

const Modal = ({ hoverScaleAnimation }) => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  const modalHidden = useSelector((state) => state.modalHidden.value);
  const navColor = useSelector((state) => state.navColor.value);
  const noteTitle = useSelector((state) => state.noteTitle.value);
  const noteText = useSelector((state) => state.noteText.value);
  const noteId = useSelector((state) => state.noteId.value);
  const articleLink = useSelector((state) => state.articleLink.value);
  const dispatch = useDispatch();

  // refs
  const inputTitleRef = React.useRef();
  const inputTextRef = React.useRef();
  const inputLinkRef = React.useRef();

  let link;

  if (currentPath === "articles") {
    link = articleLink;
  }

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
    Axios.patch(
      `http://localhost:3001/${currentPath}/${noteId}`,
      currentPath === "articles"
        ? {
            title: inputTitleRef.current.value,
            text: inputTextRef.current.value,
            link: inputLinkRef.current.value,
          }
        : {
            title: inputTitleRef.current.value,
            text: inputTextRef.current.value,
          }
    ).then(() => handleNotesUpdate());
  };

  const handleModalInputClear = () => {
    inputTextRef.current.value = "";
    inputTitleRef.current.value = "";
    if (currentPath === "articles") {
      inputLinkRef.current.value = "";
    }
  };

  const xMark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div
      className={`${modalHidden} fixed flex justify-center items-center left-0 top-0 h-full w-full pl-28 bg-black/50 `}>
      <div className={`relative h-96 w-1/2 xl:w-3/12 ${navColor} rounded-md`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <p className="text-xl font-bold">Make new note</p>
          <input
            className="w-9/12 rounded-md p-2"
            type="text"
            placeholder="Note Title..."
            ref={inputTitleRef}
            value={noteTitle}
            onChange={(e) => {
              dispatch(addNoteTitle(e.target.value));
            }}
          />
          <textarea
            className="w-9/12 rounded-md p-2"
            type="text"
            placeholder="Note Text..."
            ref={inputTextRef}
            value={noteText}
            onChange={(e) => {
              dispatch(addNoteText(e.target.value));
            }}
          />
          {currentPath === "articles" && (
            <input
              className="w-9/12 rounded-md p-2"
              type="text"
              placeholder="Article link..."
              ref={inputLinkRef}
              value={articleLink}
              onChange={(e) => {
                dispatch(setArticleLink(e.target.value));
              }}
            />
          )}
          {noteId === "" ? (
            <button
              className={`text-center px-4 py-1 bg-slate-100 rounded-full w-fit drop-shadow-md ${hoverScaleAnimation}`}
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
            className={`text-center px-4 py-1 bg-slate-100 rounded-full w-fit drop-shadow-md ${hoverScaleAnimation}`}
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
          className={`flex justify-center items-center absolute -top-3 -right-2 w-10 h-10 bg-slate-300 ${hoverScaleAnimation} rounded-full drop-shadow-md`}
          onClick={() => {
            dispatch(setModalHidden("hidden"));
            handleModalInputClear();
            dispatch(clearNoteId());
          }}>
          {xMark}
        </button>
      </div>
    </div>
  );
};

export default Modal;
