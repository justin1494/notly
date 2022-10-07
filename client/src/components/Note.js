import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addNotes } from "../features/listOfNotes/listOfNotesSlice";

const Note = () => {
  const listOfNotes = useSelector((state) => state.listOfNotes.value);
  const dispatch = useDispatch();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const handleNotesUpdate = () => {
    Axios.get("http://localhost:3001/getNotes").then((response) => {
      dispatch(addNotes(response.data || 0));
    });
    console.log("done");
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
    }).then(() => handleNotesUpdate());;
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
    </>
  );
};

export default Note;
