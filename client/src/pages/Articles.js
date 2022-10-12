import React from "react";
import { useSelector } from "react-redux";
import Article from "../components/Article";
import Modal from "../components/Modal";


const Articles = () => {
  const navColor = useSelector((state) => state.navColor.value);

  return (
    <>
    <Modal />
      <h1>
        this is <span className={`${navColor}`}> Articles </span>page
      </h1>
      <Article className="flex justify-center" />
    </>
  );
};

export default Articles;
