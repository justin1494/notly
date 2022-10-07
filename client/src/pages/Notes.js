import React from "react";
import { useSelector } from "react-redux";
import Note from "../components/Note";

const Notes = () => {
  const navColor = useSelector((state) => state.navColor.value);

  return (
    <>
      <Note className="flex justify-center"/>
    </>
  );
};

export default Notes;
