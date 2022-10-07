import React from "react";
import { useSelector } from "react-redux";


const Articles = () => {
  const navColor = useSelector((state) => state.navColor.value);

  return (
    <h1>
      this is <span className={`${navColor}`}> Articles </span>page
    </h1>
  );
};

export default Articles;
