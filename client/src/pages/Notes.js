import React from "react";
import { useSelector } from "react-redux";
import Note from "../components/Note";

const Notes = () => {
  const navColor = useSelector((state) => state.navColor.value);

  return (
    <>
    <h1><span className={navColor}>Notes</span> page</h1>
      <Note className="flex justify-center"/>
    </>
  );
};

export default Notes;
