import React, { useEffect } from "react";
// pages
import Articles from "./pages/Articles";
import Notes from "./pages/Notes";
import Twitter from "./pages/Twitter";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { articlesColor, notesColor, tweetsColor } from './features/navColor/navColorSlice'
import { useSelector, useDispatch } from "react-redux";


function App() {
  let location = useLocation();

  const navColor = useSelector((state) => state.navColor.value);
  const dispatch = useDispatch();


  useEffect(() => {
    if (location.pathname === "/articles") {
      dispatch(articlesColor());
    } else if (location.pathname === "/notes") {
      dispatch(notesColor());
    } else if (location.pathname === "/tweets") {
      dispatch(tweetsColor());
    } else {
      dispatch(notesColor());
    }
  },);

  return (
    <>
      <nav>
        <div
          className={`transition-colors absolute w-20 h-screen flex ${navColor} flex-col items-center justify-center`}>
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
      <main className="h-screen w-screen pl-28 p-10 bg-slate-600 ">
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
