import React from "react";
import Note from "../components/Note";
import Modal from "../components/Modal";

const Notes = ({hoverScaleAnimation}) => {

  return (
    <>
      <Note className="flex justify-center" />
      <Modal hoverScaleAnimation={hoverScaleAnimation}/>
    </>
  );
};

export default Notes;
