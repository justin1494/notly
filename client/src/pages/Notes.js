import React from "react";
import { useSelector } from "react-redux";
import Content from "../components/Content";

const Notes = () => {
  const navColor = useSelector((state) => state.navColor.value);

  return (
    <>
    <h1><span className={navColor}>Notes</span> page</h1>
      <Content className="flex justify-center"/>
    </>
  );
};

export default Notes;
