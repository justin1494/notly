import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalHidden } from "../slices/modalHiddenSlice";

const Modal = () => {
  const modalHidden = useSelector((state) => state.modalHidden.value);
  const dispatch = useDispatch();

  return (
    <div
      className={`${modalHidden} absolute flex justify-center items-center left-0 top-0 h-full w-full pl-28 bg-black/50`}>
      <div className="relative h-1/4 w-96 bg-red-200">
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <p>Make new note</p>
          <input type="text" placeholder="Note Title..." />
          <textarea type="text" placeholder="Note Text..." />
          <button>Create Note</button>
        </div>
        <button
          className="absolute top-2 right-5"
          onClick={() => {
            dispatch(setModalHidden("hidden"));
          }}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
