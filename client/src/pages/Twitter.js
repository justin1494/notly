import React from "react";
import { useSelector } from "react-redux";


const Twitter = () => {
  const navColor = useSelector((state) => state.navColor.value);

  return (
    <h1>
      this is <span className={`${navColor}`}> Twitter </span> page
    </h1>
  );
};

export default Twitter;
