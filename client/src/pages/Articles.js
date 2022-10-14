import React from "react";
import Article from "../components/Article";
import Modal from "../components/Modal";

const Articles = ({hoverScaleAnimation}) => {

  return (
    <>
      <Article className="flex justify-center" />
      <Modal hoverScaleAnimation={hoverScaleAnimation} />
    </>
  );
};

export default Articles;
