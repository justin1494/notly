import React from "react";

const Articles = ({ navColor }) => {
  return (
    <h1>
      this is <span className={`bg-${navColor}-200`}> Articles </span>page
    </h1>
  );
};

export default Articles;
