import React from "react";

const Articles = ({navColor}) => {
  return (
    <h1>
      this is <span className={`bg-${navColor}-200`}> articles </span>page
    </h1>
  );
};

export default Articles;
