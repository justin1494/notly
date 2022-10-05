import React, { useEffect, useState } from "react";
// pages
import Articles from "./pages/Articles";
import Notes from "./pages/Notes";
import Twitter from "./pages/Twitter";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// const handleColorChange = () => {};

function App() {
  const [navColor, setNavColor] = useState("red");
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/articles") {
      setNavColor("red");
    } else if (location.pathname === "/notes") {
      setNavColor("green");
    } else if (location.pathname === "/tweets") {
      setNavColor("blue");
    } else {
      setNavColor("red");
    }
  }, [location.pathname]);

  return (
    <>
      <nav>
        <div
          className={`transition-colors  absolute w-20 h-screen flex bg-${navColor}-200 flex-col items-center justify-center`}>
          <Link to="/notes" className="p-5">
            Notes
          </Link>
          <Link to="/articles" className="p-5">
            Articles
          </Link>
          <Link to="/tweets" className="p-5">
            Tweets
          </Link>
        </div>
      </nav>
      <main className="ml-28">
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="notes" element={<Notes navColor={navColor} />} />
          <Route path="articles" element={<Articles navColor={navColor} />} />
          <Route path="tweets" element={<Twitter navColor={navColor} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
