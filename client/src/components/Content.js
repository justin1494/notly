import React, { useEffect, useState } from "react";
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
  setDataToDisplay,
} from "../slices/slicesExport";

const Content = () => {
  const location = useLocation();
  const currentPath =
    location.pathname.slice(1) === "" ? "notes" : location.pathname.slice(1);

  // REDUX
  const listOfNotes = useSelector((state) => state.listOfNotes.value);
  const navColor = useSelector((state) => state.navColor.value);
  const dataToDisplay = useSelector((state) => state.dataToDisplay.value);
  const dispatch = useDispatch();

  // React state
  const [isLoaded, setIsLoaded] = useState(false);
  // const [noDataToDisplay, setNoDataToDisplay] = useState(false);

  const handleNotesUpdate = () => {
    Axios.get(`https://notly-app.herokuapp.com/${currentPath}`).then(
      (response) => {
        dispatch(addNotes(response.data || 0));
        setIsLoaded(true);
        response.data.length === 0
          ? dispatch(setDataToDisplay(true))
          : dispatch(setDataToDisplay(false));
      }
    );
  };

  const deleteNote = (noteId) => {
    Axios.delete(
      `https://notly-app.herokuapp.com/${currentPath}/${noteId}`
    ).then(() => handleNotesUpdate());
  };

  const showModalHandler = () => {
    dispatch(setModalHidden(""));
  };

  useEffect(() => {
    dispatch(addNotes([]));
    handleNotesUpdate();
  }, []);

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

  const hoverScaleAnimation = "hover:scale-90 duration-300";

  return (
    <>
      <h1 className="text-center mb-10 text-4xl text-slate-300">
        {currentPath}
      </h1>

      {isLoaded === false && (
        <div class="text-center">
          <div role="status">
            <svg
              class="inline mt-20 mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <p className="text-4xl text-center mt-24 text-slate-400">
            Data is loading...
          </p>
        </div>
      )}

      {dataToDisplay === true && (
        <p className="text-4xl text-center mt-24 text-slate-400">
          You have no saved {currentPath}
        </p>
      )}

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
