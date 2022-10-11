import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addArticle } from "../features/listOfArticles/listOfArticlesSlice";

const Article = () => {
  const listOfArticles = useSelector((state) => state.listOfArticles.value);
  const navColor = useSelector((state) => state.navColor.value);
  const dispatch = useDispatch();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteId, setNoteId] = useState("");

  const inputTitleRef = React.useRef();
  const inputTextRef = React.useRef();

  const handleNotesUpdate = () => {
    Axios.get("http://localhost:3001/articles").then((response) => {
      dispatch(addArticle(response.data || 0));
    });
  };

  useEffect(() => {
    handleNotesUpdate();
  }, []);

  const createNote = () => {
    Axios.post("http://localhost:3001/createNote", {
      title: noteTitle,
      text: noteText,
    }).then(() => handleNotesUpdate());
  };

  const deleteNote = (noteId) => {
    Axios.delete("http://localhost:3001/deleteNote", {
      data: { _id: noteId },
    }).then(() => handleNotesUpdate());
  };

  const handleNoteChange = () => {
    Axios.put("http://localhost:3001/editNote", {
      _id: noteId,
      title: inputTitleRef.current.value,
      text: inputTextRef.current.value,
    }).then(() => handleNotesUpdate());
  };

  return (
    <>
      <div className="flex justify-start items-start gap-10 flex-wrap">
        {listOfArticles.map((note) => {
          return (
            <div
              className="w-48 max-h-fit bg-slate-300 rounded-md overflow-hidden"
              data-id={note._id}>
              <h2
                className={`flex justify-center p-2 text-md font-bold ${navColor}`}>
                {note.title}
              </h2>
              <p className="p-5">{note.text}</p>
              <a
                href={note.link}
                target="_blank"
                className="p-5"
                rel="noreferrer">
                {note.link}
              </a>
              <button
                onClick={(e) => {
                  deleteNote(e.target.parentElement.getAttribute("data-id"));
                }}>
                X
              </button>
              <button
                onClick={(e) => {
                  inputTitleRef.current.value =
                    e.target.parentElement.children[0].innerText;
                  inputTextRef.current.value =
                    e.target.parentElement.children[1].innerText;
                  setNoteId(e.target.parentElement.getAttribute("data-id"));
                }}>
                Edit
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-48 flex gap-10">
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => {
            setNoteTitle(e.target.value);
          }}
        />
        <textarea
          type="text"
          placeholder="Age..."
          onChange={(e) => {
            setNoteText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            createNote();
          }}>
          Create User
        </button>
      </div>
      <div className="flex gap-10 mt-20">
        <input
          type="text"
          placeholder="Name2..."
          onChange={(e) => {
            setNoteTitle(e.target.value);
          }}
          ref={inputTitleRef}
        />
        <textarea
          type="text"
          placeholder="Age2..."
          onChange={(e) => {
            setNoteText(e.target.value);
          }}
          ref={inputTextRef}
        />
        <button
          onClick={() => {
            handleNoteChange();
          }}>
          Update Note
        </button>
      </div>
    </>
  );
};

export default Article;
