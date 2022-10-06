import { configureStore } from "@reduxjs/toolkit";
import  navColorSlice  from "../features/navColor/navColorSlice";

export default configureStore({
  reducer: {
    navColor: navColorSlice
  },
});
