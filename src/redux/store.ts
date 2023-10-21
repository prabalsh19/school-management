import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./slices/studentSlice";
import { teacherSlice } from "./slices/teacherSlice";
import { schoolSlice } from "./slices/schoolSlice";

export const store = configureStore({
  reducer: {
    students: studentSlice.reducer,
    teachers: teacherSlice.reducer,
    school: schoolSlice.reducer,
  },
});
