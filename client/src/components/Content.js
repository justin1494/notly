import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import uniqid from "uniqid";

import {
  addNotes,
  addNoteTitle,
  addNoteText,
  addNoteId,
  setModalHidden,
  setArticleLink,
} from "../slices/slicesExport";

const Content = () => {
  const location = useLocation();
  const currentPath =
    location.pathname.slice(1) === "" ? "notes" : location.pathname.slice(1);

  const listOfNotes = useSelector((state) => state.listOfNotes.value);
  const navColor = useSelector((state) => state.navColor.value);
  const dispatch = useDispatch();

  // icons

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

  const handleNotesUpdate = () => {
    Axios.get(`https://notly-app.herokuapp.com/${currentPath}`).then(
      (response) => {
        dispatch(addNotes(response.data || 0));
      }
    );
  };

  useEffect(() => {
    dispatch(addNotes([]));
    handleNotesUpdate();
    console.log('fire')
  },[]);

  const deleteNote = (noteId) => {
    Axios.delete(
      `https://notly-app.herokuapp.com/${currentPath}/${noteId}`
    ).then(() => handleNotesUpdate());
  };

  const showModalHandler = () => {
    dispatch(setModalHidden(""));
  };

  const hoverScaleAnimation = "hover:scale-90 duration-300";

  const isLoading = (
    <p className="text-4xl text-center mt-24 color-white">data is loading</p>
  );

  return (
    <>
      <h1 className="text-center mb-10 text-4xl text-slate-300">
        {currentPath}
      </h1>

      {listOfNotes.length === 0 && isLoading}

      <div className="flex h-full w-full sm:justify-start justify-center items-start gap-10 flex-wrap drop-shadow-md">
        {listOfNotes.map((note) => {
          return (
            <div
              className="relative flex flex-col items-center gap-5 w-64 lg:w-80 h-fit pb-9 bg-white rounded-md "
              data-id={note._id}
              key={uniqid()}>
              <h2
                className={`text-center p-2 text-md font-bold rounded-md w-full drop-shadow-md ${navColor}`}>
                {note.title}
              </h2>
              <p className="text-center px-4">{note.text}</p>
              {currentPath === "articles" && (
                <a
                  className={`text-center px-4 py-1 bg-slate-100 rounded-full w-fit drop-shadow-md ${hoverScaleAnimation}`}
                  href={note.link}
                  target="_blank"
                  rel="noreferrer">
                  Open article
                </a>
              )}
              <button
                className={`flex justify-center items-center absolute -top-3 -right-2 w-7 h-7 bg-slate-300 ${hoverScaleAnimation} rounded-full drop-shadow-md`}
                onClick={(e) => {
                  deleteNote(
                    e.currentTarget.parentElement.getAttribute("data-id")
                  );
                }}>
                {xMark}
              </button>
              <button
                className={`flex justify-center items-center absolute -bottom-3 left-1/2 -translate-x-2/4 w-16 h-7 bg-slate-300 ${hoverScaleAnimation} rounded-full drop-shadow-md`}
                onClick={(e) => {
                  dispatch(
                    addNoteId(
                      e.currentTarget.parentElement.getAttribute("data-id")
                    )
                  );
                  dispatch(
                    addNoteTitle(
                      e.currentTarget.parentElement.children[0].innerText
                    )
                  );
                  dispatch(
                    addNoteText(
                      e.currentTarget.parentElement.children[1].innerText
                    )
                  );
                  currentPath === "articles" &&
                    dispatch(
                      setArticleLink(
                        e.currentTarget.parentElement.children[2].attributes[1]
                          .value
                      )
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
          className={`fixed sm:bottom-14 bottom-4 sm:left-36 right-5 w-max sm:border-none border-solid border-white	border-4 sm:text-base text-sm ${hoverScaleAnimation} p-2 px-4 rounded-md ${navColor} z-20 `}
          onClick={() => {
            showModalHandler();
            dispatch(addNoteTitle(""));
            dispatch(addNoteText(""));
            dispatch(setArticleLink(""));
          }}>
          Create new {currentPath.slice(0, -1)}
        </button>
      </div>
    </>
  );
};

export default Content;
