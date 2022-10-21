import React from "react";
import Content from "../components/Content";
import Modal from "../components/Modal";

const Articles = ({hoverScaleAnimation}) => {

  return (
    <>
      <Content className="flex justify-center" />
      <Modal hoverScaleAnimation={hoverScaleAnimation} />
    </>
  );
};

export default Articles;
