import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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
    Axios.get(`http://192.168.0.73:3001/${currentPath}`).then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  };

  useEffect(() => {
    // first it makes listOfNotes a blank array, then handleNotesUpdate takes care of updating listOfNotes. Thanks to that, there is no "lag", after changing pages.
    dispatch(addNotes([]));
    handleNotesUpdate();
  }, []);

  const deleteNote = (noteId) => {
    Axios.delete(`http://192.168.0.73:3001/${currentPath}/${noteId}`).then(() =>
      handleNotesUpdate()
    );
  };

  const showModalHandler = () => {
    dispatch(setModalHidden(""));
  };

  const hoverScaleAnimation = "hover:scale-90 duration-300";

  return (
    <>
      <div className="flex h-full w-full sm:justify-start justify-center items-center gap-10 flex-wrap drop-shadow-md">
        {listOfNotes.map((note) => {
          return (
            <div
              className="relative flex flex-col items-center gap-5 w-64 lg:w-80 h-fit pb-9 bg-white rounded-md "
              data-id={note._id}>
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
          className={`fixed sm:bottom-14 bottom-4 sm:left-36 right-5 w-max sm:border-none border-solid border-white	border-4	${hoverScaleAnimation} p-2 px-4 rounded-md ${navColor} z-20`}
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
