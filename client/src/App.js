import React, { useState } from "react";
// pages
import Articles from "./pages/Articles";
import Notes from "./pages/Notes";
import Twitter from "./pages/Twitter";
import { Routes, Route, Link } from "react-router-dom";

// const handleColorChange = () => {};

function App() {
  const [navColor, setNavColor] = useState("red");

  return (
    <>
      <nav>
        <div
          className={`transition-colors  absolute w-20 h-screen flex bg-${navColor}-200 flex-col items-center justify-center`}>
          <Link
            to="/notes"
            className="p-5"
            onClick={() => {
              setNavColor("red");
            }}>
            Notes
          </Link>
          <Link
            to="/articles"
            className="p-5"
            onClick={() => {
              setNavColor("green");
            }}>
            Articles
          </Link>
          <Link
            to="/tweets"
            className="p-5"
            onClick={() => {
              setNavColor("blue");
            }}>
            Tweets
          </Link>
        </div>
      </nav>
      <main className="ml-28">
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="notes" element={<Notes navColor={navColor}/>} />
          <Route path="articles" element={<Articles navColor={navColor}/>} />
          <Route path="tweets" element={<Twitter navColor={navColor}/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
