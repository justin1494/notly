import React, { useEffect, useRef } from "react";
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

  const noteRef = useRef();
  const articlesRef = useRef();

  useEffect(() => {
    const borderStyle = "border-solid";
    const borderWidth = "border-2";
    const borderColor = "border-slate-500";

    if (location.pathname === "/articles") {
      dispatch(articlesColor());
      dispatch(articlesPage());
      articlesRef.current.classList.add(borderStyle, borderWidth, borderColor);
      noteRef.current.classList.remove(borderStyle, borderWidth, borderColor);
    } else if (location.pathname === "/notes") {
      dispatch(notesColor());
      dispatch(notesPage());
      noteRef.current.classList.add(borderStyle, borderWidth, borderColor);
      articlesRef.current.classList.remove(
        borderStyle,
        borderWidth,
        borderColor
      );
    } else {
      dispatch(notesColor());
      dispatch(notesPage());
      articlesRef.current.classList.remove(
        borderStyle,
        borderWidth,
        borderColor
      );
      noteRef.current.classList.add(borderStyle, borderWidth, borderColor);
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
    "flex flex-col sm:w-20 w-20 sm:h-28 items-center justify-center gap-2 sm:p-2 p-1 ease-in duration-100 sm:rounded-full ";

  const hoverScaleAnimation = "hover:scale-90 duration-300";

  return (
    <>
      <nav>
        <div
          className={`fixed transition-colors w-screen sm:w-24 sm:h-screen h-20 flex ${navColor} sm:gap-10 gap-5 sm:pl-0 pl-6 sm:flex-col bottom-0 z-10 items-center sm:justify-center justify-start`}>
          <Link
            ref={noteRef}
            to="/notes"
            className={`${iconsStyles} decoration-green-200 `}>
            {notesIcon}
            <p>Notes</p>
          </Link>
          <Link
            ref={articlesRef}
            to="/articles"
            className={`${iconsStyles} decoration-red-200`}>
            {articlesIcon}
            <p>Articles</p>
          </Link>
        </div>
      </nav>
      <main className="w-full min-h-screen sm:pl-36 p-10 bg-slate-600 ">
        <Routes>
          <Route path="/*" element={<Notes />} />
          <Route
            path="notes"
            element={<Notes hoverScaleAnimation={hoverScaleAnimation} />}
          />
          <Route
            path="articles"
            element={<Articles hoverScaleAnimation={hoverScaleAnimation} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
