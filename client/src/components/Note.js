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
  const noteTitle = useSelector((state) => state.noteTitle.value);
  const noteText = useSelector((state) => state.noteText.value);
  const noteId = useSelector((state) => state.noteId.value);

  const dispatch = useDispatch();
  const inputTitleRef = React.useRef();
  const inputTextRef = React.useRef();

  const handleNotesUpdate = () => {
    Axios.get("http://localhost:3001/notes").then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  };

  useEffect(() => {
    handleNotesUpdate();
  }, []);

  const createNote = () => {
    Axios.post("http://localhost:3001/notes", {
      title: noteTitle,
      text: noteText,
    }).then(() => handleNotesUpdate());
  };

  const deleteNote = (noteId) => {
    Axios.delete(`http://localhost:3001/notes/${noteId}`).then(() =>
      handleNotesUpdate()
    );
  };

  const handleNoteChange = () => {
    Axios.patch(`http://localhost:3001/notes/${noteId}`, {
      title: inputTitleRef.current.value,
    }).then(() => handleNotesUpdate());
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
                  // inputTitleRef.current.value =
                  //   e.target.parentElement.children[0].innerText;
                  // inputTextRef.current.value =
                  //   e.target.parentElement.children[1].innerText;
                  // setNoteId(e.target.parentElement.getAttribute("data-id"));
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
        {/* <input
          type="text"
          placeholder="Name..."
          onChange={(e) => {
            // setNoteTitle(e.target.value);
            dispatch(addNoteTitle(e.target.value));
          }}
        />
        <textarea
          type="text"
          placeholder="Age..."
          onChange={(e) => {
            // setNoteText(e.target.value);
            dispatch(addNoteText(e.target.value));
          }}
        /> */}
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
      {/* <div className="flex gap-10 mt-20">
        <input
          type="text"
          placeholder="Name2..."
          onChange={(e) => {
            // setNoteTitle(e.target.value);
            dispatch(addNoteTitle(e.target.value));
          }}
          ref={inputTitleRef}
        />
        <textarea
          type="text"
          placeholder="Age2..."
          onChange={(e) => {
            // setNoteText(e.target.value);
            dispatch(addNoteText(e.target.value));
          }}
          ref={inputTextRef}
        />
        <button
          onClick={() => {
            handleNoteChange();
          }}>
          Update Note
        </button>
      </div> */}
    </>
  );
};

export default Note;
