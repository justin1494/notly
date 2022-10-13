import React, { useEffect } from "react";
// pages
import Articles from "./pages/Articles";
import Notes from "./pages/Notes";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  articlesColor,
  notesColor,
  notesPage,
  articlesPage,
} from "./slices/slicesExport";
import { useSelector, useDispatch } from "react-redux";

// jest globalny state, który zmienia się w zalezności od strony na której się jest. Obszedłem to stosując useLocation(), ale na razie state zostawiam w razie czego. Nazwa globalnego state to currentPage

function App() {
  let location = useLocation();

  const navColor = useSelector((state) => state.navColor.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/articles") {
      dispatch(articlesColor());
      dispatch(articlesPage());
    } else if (location.pathname === "/notes") {
      dispatch(notesColor());
      dispatch(notesPage());
    } else {
      dispatch(notesColor());
      dispatch(notesPage());
    }
  });
  const notesIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
  const articlesIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );

  const iconsStyles =
    "flex flex-col items-center gap-2 p-5 hover:scale-110 ease-in duration-200";

  return (
    <>
      <nav>
        <div
          className={`transition-colors absolute w-24 h-screen flex ${navColor}200 flex-col items-center justify-center`}>
          <Link to="/notes" className={iconsStyles}>
            {notesIcon}
            <p>Notes</p>
          </Link>
          <Link to="/articles" className={iconsStyles}>
            {articlesIcon}
            <p>Articles</p>
          </Link>
        </div>
      </nav>
      <main className="h-screen w-screen pl-28 p-10 bg-slate-600 ">
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="notes" element={<Notes navColor={navColor} />} />
          <Route path="articles" element={<Articles navColor={navColor} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
