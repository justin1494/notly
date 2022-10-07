import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addNotes } from "../features/listOfNotes/listOfNotesSlice";

const Note = () => {
  const listOfNotes = useSelector((state) => state.listOfNotes.value);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get("http://localhost:3001/getNotes").then((response) => {
      dispatch(addNotes(response.data || 0));
    });
  }, []);

  return (
    <div className="flex justify-start items-start gap-10 flex-wrap">
      {listOfNotes.map((note) => {
        return (
          <div className="w-48 max-h-fit bg-orange-200 rounded-md overflow-hidden">
            <h2 className="flex justify-center p-2 text-md font-bold bg-green-200">
              {note.title}
            </h2>
            <p className="p-5">{note.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Note;
